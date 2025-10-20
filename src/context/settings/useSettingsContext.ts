import { useContext } from "react";
import { SettingsContext, type SettingsContextType } from "./context.ts";

export default function useSettingsContext() {
  return useContext<SettingsContextType>(SettingsContext);
}