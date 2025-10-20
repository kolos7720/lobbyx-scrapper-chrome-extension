export enum MessageTypes {
  Start = 'START',
  Finish = 'FINISH',
}

export type StartMessage = {
  type: MessageTypes.Start;
  vacancies: string[];
}

export type FinishMessage = {
  type: MessageTypes.Start;
}
