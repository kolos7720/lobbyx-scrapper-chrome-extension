import "./sidePanel.ts";
// import "./contextMenus.ts";
import { MessageTypes } from "../messages.ts";
import type { Application, Settings } from "../types.ts";
import { initialScrapperContextState } from "../context/scrapper/constants.ts";
import type { ScrapperContextStateType } from "../context/scrapper/types.ts";

type State = ScrapperContextStateType;

const stack: string[] = [];
let state: State = initialScrapperContextState;
let settings: Settings | null = null;

const setState = async (newState: Partial<State>) => {
  state = {
    ...state,
    ...newState,
  }

  await chrome.storage.session.set({ state })
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log('message', message);

  switch (message.type) {
    case MessageTypes.Start: {
      stack.push(...message.vacancies.reverse());
      settings = message.settings;

      await setState({
        ...initialScrapperContextState,
        isScrapping: true,
        currentVacancyIndex: 0,
      })
      await next();

      break;
    }

    case MessageTypes.Fail: {
      await handleError(Error(message.error));

      break;
    }

    case MessageTypes.ApplicationScrapped: {
      await triggerWebhook(message.application);

      break;
    }

    case MessageTypes.PageScrapped: {
      if (message.nextPageURL) stack.push(message.nextPageURL);
      await next();

      break;
    }
  }
})

function getListOfVacancies() {
  return settings?.vacanciesURLs.split('\n') || [];
}

function findVacancyIndex(url: string) {
  return getListOfVacancies().findLastIndex((vacancyURL) => url.includes(vacancyURL));
}

async function openNextURL(url: string) {
  chrome.tabs.create({ url, active: false }, async (tab) => {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ["content.js"],
      })
    } catch (error) {
      console.log('error');
      await handleError(error as Error);
    }
  });

  await setState({ currentVacancyIndex: findVacancyIndex(url) })
}

async function finish() {
  await setState({
    isScrapping: false,
    isFinished: true,
    currentVacancyIndex: getListOfVacancies().length
  });

  console.log('Finished!');
}

async function next() {
  const url = stack.pop();

  if (url) {
    await openNextURL(url)
  } else {
    await finish();
  }
}

async function triggerWebhook(application: Application) {
  const webhookUrl = settings?.webHookURL;

  if (!webhookUrl) throw new Error('Webhook URL not found');

  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application,
    }),
  })
}

async function handleError(error: Error) {
  await setState({
    isScrapping: false,
    isFailed: true,
    error: error?.message,
  });
}

self.addEventListener('error', async (event) => {
  console.error('Unhandled error in service worker:', event.message, event.filename, event.lineno, event.colno);

  await handleError(event.error);
});

self.addEventListener('unhandledrejection', async (event) => {
  console.error('Unhandled Promise Rejection in service worker:', event.reason);

  await handleError(Error(event.reason));
});
