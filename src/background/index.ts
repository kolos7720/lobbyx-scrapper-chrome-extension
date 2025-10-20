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
    case MessageTypes.Start:
      stack.push(...message.vacancies);

      await setState({ isScrapping: true })

      break;
  }
})
