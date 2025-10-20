import { createContext } from "react";

export type ScrapperContextType = {
  isScrapping: boolean;
  isFinished: boolean;

  start: () => Promise<void>;
}

export const initialScrapperContextState = {
  isScrapping: false,
  isFinished: false,

  start: async () => {},
};

export const ScrapperContext = createContext<ScrapperContextType>(initialScrapperContextState);