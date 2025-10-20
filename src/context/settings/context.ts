import { createContext } from "react";
import type { Settings } from "../../types.ts";

export type SettingsContextType = {
  settings: Settings & {};

  isLoading: boolean;
  vacanciesURLsList: string[];

  setSettings: (settings: Settings) => Promise<void>;
  openSettingsPage: () => Promise<void>;
}

export const initialSettingsContextState = {
  settings: {
    webHookURL: '',
    vacanciesURLs: '',
  },

  isLoading: false,
  vacanciesURLsList: [],

  setSettings: async () => {},
  openSettingsPage: async () => {},
}

export const SettingsContext = createContext<SettingsContextType>(initialSettingsContextState);