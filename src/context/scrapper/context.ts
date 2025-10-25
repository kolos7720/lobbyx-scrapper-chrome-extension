import { createContext } from "react";
import type { ScrapperContextStateType } from "./types.ts";

export type ScrapperContextType = ScrapperContextStateType & {
  start: () => Promise<void>;
}

export const ScrapperContext = createContext<ScrapperContextType>({} as ScrapperContextType);