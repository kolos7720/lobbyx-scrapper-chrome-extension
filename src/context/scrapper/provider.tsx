import { type PropsWithChildren, useCallback, useMemo, useReducer, useState } from "react";
import { initialScrapperContextState, ScrapperContext, type ScrapperContextType } from "./context.ts";
import useSettingsContext from "../settings/useSettingsContext.ts";

type Props = PropsWithChildren & {}

type State = ScrapperContextType;

enum ActionType {
  Start = 'START',
  Finish = 'FINISH',
}

type Action = { type: ActionType.Start }
  | { type: ActionType.Finish }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.Start:
      return {
        ...state,
        isScrapping: true,
        isFinished: false,
      }

    case ActionType.Finish:
      return {
        ...state,
        isScrapping: false,
        isFinished: true,
      }

    default:
      return state;
  }
}

export default function ScrapperProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialScrapperContextState);
  const { vacanciesURLsList } = useSettingsContext();

  console.log('vacanciesURLsList', vacanciesURLsList);

  const [stack, setStack] = useState<string[]>([]);

  const parseVacancy = useCallback(async (url: string) => {
    chrome.tabs.create({ url, active: false }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ["content.js"]
      });
    });
  }, [])

  const start = useCallback(async () => {
    dispatch({ type: ActionType.Start })
    setStack([...vacanciesURLsList.reverse()])

    const url = stack.pop();

    if (url) {
      await parseVacancy(url)
    } else {
      dispatch({ type: ActionType.Finish })

      console.log(Error('No vacancies left'))
    }
  }, [])

  const memoizedValue = useMemo(() => ({
    ...state,

    start,
  }), [])

  return (
    <ScrapperContext.Provider value={memoizedValue}>
      { children }
    </ScrapperContext.Provider>
  )
}