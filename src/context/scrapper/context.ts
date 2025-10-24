import { createContext } from "react";

export type ScrapperContextStateType = {
  isScrapping: boolean;
  isFinished: boolean;
}

export type ScrapperContextType = ScrapperContextStateType & {
  start: () => Promise<void>;
}

export const ScrapperContext = createContext<ScrapperContextType>({} as ScrapperContextType);