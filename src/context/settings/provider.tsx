import {
  SettingsContext,
  type SettingsContextStateType,
} from "./context.ts";
import { type PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from "react";
import { StorageKeys } from "../../constants.ts";
import { initialSettingsContextState } from "./constants.ts";

type Props = PropsWithChildren & {}
type State = SettingsContextStateType;

enum ActionType {
  Loading = 'LOADING',
  SetSettings = 'SET_SETTINGS',
}

type Action = { type: ActionType.Loading, payload: boolean }
  | { type: ActionType.SetSettings, payload: State['settings'] }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.Loading:
      return {
        ...state,
        isLoading: action.payload,
      }

    case ActionType.SetSettings:
      return {
        ...state,
        settings: action.payload,
      }

    default:
      return state;
  }
}

export default function SettingsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialSettingsContextState);

  const getSettings = useCallback(async () => {
    dispatch({ type: ActionType.Loading, payload: true })

    try {
      const { settings } = await chrome.storage.local.get(StorageKeys.Settings)

      if (settings) dispatch({ type: ActionType.SetSettings, payload: settings })
    } catch (error) {
      console.error(error)
    }

    dispatch({ type: ActionType.Loading, payload: false })
  }, [])

  useEffect(() => {
    getSettings()
  }, [getSettings])

  const setSettings = useCallback(async (settings: State['settings']) => {
    try {
      await chrome.storage.local.set({ [StorageKeys.Settings]: settings })

      dispatch({ type: ActionType.SetSettings, payload: settings })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const openSettingsPage = useCallback(async () => {
    await chrome.runtime.openOptionsPage()
  }, [])

  const vacanciesURLsList = useMemo(() => {
    return state.settings.vacanciesURLs
      .split('\n')
      .map(url => url.trim()).filter(Boolean);
  }, [state.settings.vacanciesURLs])

  const memoizedValue = useMemo(() => {
    return {
      ...state,
      vacanciesURLsList,
      setSettings,
      openSettingsPage,
    }
  }, [state, vacanciesURLsList, setSettings])

  return (
    <SettingsContext.Provider value={memoizedValue}>
      { children }
    </SettingsContext.Provider>
  )
}