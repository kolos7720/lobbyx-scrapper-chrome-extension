import "./sidePanel.ts";
import "./contextMenus.ts";
import { MessageTypes } from "../messages.ts";
import {
  initialScrapperContextState,
  type ScrapperContextStateType,
} from "../context/scrapper/context.ts";
import type { Application, Settings } from "../types.ts";

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
      // go to next page
      break;
    }
  }

})

function openNextPage() {
  const url = stack.pop();

  if (url) {
    chrome.tabs.create({ url, active: false }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ["content.js"]
      });
    });
  } else {

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
