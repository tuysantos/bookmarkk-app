import { GroupedObservable } from "rxjs";

export class BookMark {
    id?: string;
    name: string;
    url: string;
    group: Group;
  }

  export enum Group {
      WORK = 'WORK',
      PERSONAL = 'PERSONAL',
      RESEARCH = 'RESEARCH',
      LEISURE = 'LEISURE',
  }

  export class BookMarkUpdateResponse {
    updateBookMark: boolean
  }

  export class BookMarkDeleteResponse {
    deleteBookMark: boolean
  }