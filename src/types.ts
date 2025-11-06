export type Settings = {
  webHookURL: string;
  vacanciesURLs: string;
  skipBefore: string | null;
}

export type Application = {
  id: string;
  created: string;
  scrapped: boolean;
  status: string;
  candidate: {
    fullName: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number,
    serviceman: boolean,
    rank: string,
    source: string,
    cvLink?: string | null;
    coverLetterLink?: string | null;
    addendumLink1?: string | null;
    addendumLink2?: string | null;
    addendumLink3?: string | null;
    addendumLink4?: string | null;
    addendumLink5?: string | null;
  }
  vacancy: {
    title: string;
    url: string;
  }
}
