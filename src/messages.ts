import type { Application, Settings } from "./types.ts";

export enum MessageTypes {
  Start = 'START',
  Finish = 'FINISH',
  ApplicationScrapped = 'APPLICATION_SCRAPPED',
  PageScrapped = 'PAGE_SCRAPPED',
}

export type StartMessage = {
  type: MessageTypes.Start;
  vacancies: string[];
  settings: Settings;
}

export type FinishMessage = {
  type: MessageTypes.Finish;
}

export type ApplicationScrapped = {
  type: MessageTypes.ApplicationScrapped;
  application: Application;
}

export type PageScrapped = {
  type: MessageTypes.PageScrapped;
}
