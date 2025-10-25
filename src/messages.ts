import type { Application, Settings } from "./types.ts";

export enum MessageTypes {
  Start = 'START',
  Finish = 'FINISH',
  Fail = 'FAIL',
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

export type FailMessage = {
  type: MessageTypes.Fail;
  error?: string;
}

export type ApplicationScrappedMessage = {
  type: MessageTypes.ApplicationScrapped;
  application: Application;
}

export type PageScrappedMessage = {
  type: MessageTypes.PageScrapped;
  nextPageURL?: string;
}
