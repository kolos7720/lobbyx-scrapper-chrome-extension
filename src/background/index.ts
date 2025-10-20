import "./sidePanel.ts";
import "./contextMenus.ts";
import { MessageTypes } from "../messages.ts";
import {
  initialScrapperContextState,
  type ScrapperContextStateType,
} from "../context/scrapper/context.ts";

type State = ScrapperContextStateType;

const stack: string[] = [];
let state: State = initialScrapperContextState;

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
      await setState({ isScrapping: true })
      openNextPage();

      break;
    }

    case MessageTypes.ApplicationScrapped: {
      // trigger web hook
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
