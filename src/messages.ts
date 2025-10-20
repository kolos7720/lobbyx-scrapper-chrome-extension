import type { Application } from "./types.ts";

export enum MessageTypes {
  Start = 'START',
  Finish = 'FINISH',
  ApplicationScrapped = 'APPLICATION_SCRAPPED',
  PageScrapped = 'PAGE_SCRAPPED',
}

export type StartMessage = {
  type: MessageTypes.Start;
  vacancies: string[];
}

export type FinishMessage = {
  type: MessageTypes.Start;
}

export type ApplicationScrapped = {
  type: MessageTypes.ApplicationScrapped;
  application: Application;
}

export type PageScrapped = {
  type: MessageTypes.PageScrapped;
}


