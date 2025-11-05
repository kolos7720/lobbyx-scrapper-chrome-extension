import { createContext } from "react";
import type { Settings } from "../../types.ts";

export type SettingsContextStateType = {
  settings: Settings & {};

  isLoading: boolean;
  vacanciesURLsList: string[];
}

export const initialSettingsContextState: SettingsContextStateType = {
  settings: {
    webHookURL: '',
    vacanciesURLs: '',
    skipBefore: null,
  },

  isLoading: false,
  vacanciesURLsList: [],
}

export type SettingsContextType = SettingsContextStateType & {
  setSettings: (settings: Settings) => Promise<void>;
  openSettingsPage: () => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);