export type ScrapperContextStateType = {
  isScrapping: boolean;
  isFinished: boolean;
  isFailed: boolean;
  error?: Error | string | null;
  currentVacancyIndex: number;
}
