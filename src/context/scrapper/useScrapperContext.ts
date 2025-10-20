import { useContext } from "react";
import { ScrapperContext, type ScrapperContextType } from "./context.ts";

export default function useScrapperContext() {
  return useContext<ScrapperContextType>(ScrapperContext);
}