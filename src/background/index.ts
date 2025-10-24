import "./sidePanel.ts";
import "./contextMenus.ts";
import { type FinishMessage, MessageTypes } from "../messages.ts";
import type { Application, Settings } from "../types.ts";
import { initialScrapperContextState } from "../context/scrapper/constants.ts";

type State = any;

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
      stack.push(...message.vacancies);
      settings = message.settings;

      await setState({ isScrapping: true })
      openNextPage();

      break;
    }

    case MessageTypes.ApplicationScrapped: {
      await triggerWebhook(message.application);

      break;
    }

    case MessageTypes.PageScrapped: {
      if (message.nextPageURL) stack.push(message.nextPageURL);
      openNextPage();

      break;
    }
  }

})

async function openNextPage() {
  const url = stack.pop();

  if (url) {
    chrome.tabs.create({ url, active: false }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ["content.js"]
      });
    });
  } else {
    await chrome.runtime.sendMessage<FinishMessage>({
      type: MessageTypes.Finish,
    });
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
