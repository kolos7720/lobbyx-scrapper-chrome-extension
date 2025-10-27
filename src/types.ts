export type Settings = {
  webHookURL: string;
  vacanciesURLs: string;
}

export type Application = {
  id: string;
  created: string;
  scrapped: boolean;
  candidate: {
    fullName: string;
    firstName: string;
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
