export interface CreateObject {
  title: string;
  fields: Field[];
  data?: any[];
  initLink: string;
  createLink: string;
  changeFn?: Function;
}

export interface Field {
  type: FieldType;
  name: string;
  id: string;
  data?: any;
}

export interface Country {
  id: number;
  title: string;
  cities: any; // FIXME Add city interface
}

export enum FieldType {
  input, select
}

