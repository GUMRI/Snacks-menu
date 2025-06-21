
import {
  RxCollection,
  RxDocument,
} from 'rxdb/plugins/core';



export type Logs = {
  type: 'create' | 'update' | 'delete' | string;
  at: string;
  by: string;
  before: string;// json string partail <T>
  updateObj: string;// json string partail <T>
}

export interface BaseDoc {
  id: string; // by default id is a primary and create by crypto.randomUUID()
  logs: Logs[];
}


export type TDocument<T> = RxDocument<T & BaseDoc>

export type TCollection<T> = RxCollection<T & BaseDoc>







