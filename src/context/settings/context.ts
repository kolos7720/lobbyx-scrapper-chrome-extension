import { createContext } from "react";
import type { Settings } from "../../types.ts";

export type SettingsContextStateType = {
  settings: Settings & {};

  isLoading: boolean;
  vacanciesURLsList: string[];
}

export type SettingsContextType = SettingsContextStateType & {
  setSettings: (settings: Settings) => Promise<void>;
  openSettingsPage: () => Promise<void>;
}

export const initialSettingsContextState = {
  // settings: {
  //   webHookURL: '',
  //   vacanciesURLs: '',
  // },
  settings: {
    webHookURL: "http://localhost:3001",
    vacanciesURLs: "https://hirefire.thelobbyx.com/vacancies/688745ecbc6cf7495dcf7984\nhttps://hirefire.thelobbyx.com/vacancies/687e1e3640a32990ecad4854",
  },

  isLoading: false,
  vacanciesURLsList: [],
}

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);