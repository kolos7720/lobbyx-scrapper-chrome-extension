export type Settings = {
  webHookURL: string;
  vacanciesURLs: string;
  skipBefore: string | null;
}

export type Application = {
  id: string;
  created: string;
  scrapped: boolean;
  candidate: {
    fullName: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phoneNumber: string;
    cvLink?: string;
  }
  vacancy: {
    title: string;
    url: string;
  }
}
