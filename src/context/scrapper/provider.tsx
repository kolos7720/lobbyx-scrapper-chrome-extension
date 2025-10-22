import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import {
  initialScrapperContextState,
  ScrapperContext,
  type ScrapperContextStateType,
} from "./context.ts";
import useSettingsContext from "../settings/useSettingsContext.ts";
import { MessageTypes, type StartMessage } from "../../messages.ts";

type Props = PropsWithChildren & {};
type State = ScrapperContextStateType;

export default function ScrapperProvider({ children }: Props) {
  const { settings } = useSettingsContext();

  const [state, setState] = useState<State>(initialScrapperContextState)
  const { vacanciesURLsList } = useSettingsContext()

  const init = async () => {
    const storage = await chrome.storage.session.get('state')

    if (storage.state) {
      setState((currentState) => ({
        ...currentState,
        ...storage.state,
      }));
    }

    chrome.storage.session.onChanged.addListener(async (changes) => {
      setState(changes.state.newValue)
    })
  }

  useEffect(() => {
    init();
  }, []);

  const start = useCallback(async () => {
    await chrome.runtime.sendMessage<StartMessage>({
      type: MessageTypes.Start,
      vacancies: vacanciesURLsList,
      settings,
    })
  }, [vacanciesURLsList])

  const memoizedValue = useMemo(() => ({
    ...state,

    start,
  }), [state, start])

  return (
    <ScrapperContext.Provider value={memoizedValue}>
      { children }
    </ScrapperContext.Provider>
  )
}