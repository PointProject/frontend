export interface CreateObject {
  title: string;
  fields: Field[];
  data: any[];
  initLink: string;
  createLink: string;

  // Hooks
  beforeSave(data: any): void;

  createNewInstance(): void;

  onClear(): void;

  onDataLoaded(data: any): void;

  onSelectItem(data: any): void;

  onToggleEdit(isEdit: boolean): void;

  valueChanges(data: any): void;
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
}

export interface City {
  id: number;
  title: string;
  country: Country;
}

export interface Point {
  id: number;
  latitude: number;
  longitude: number;
  numberInSequence: number;
}

export interface MoneyPoint {
  id: number;
  isActivated: number;
  latitude: number;
  longitude: number;
  value: number;
  gameUser: GameUser;
  race: Race;
  zone: Zone;
}

export interface Zone {
  id: number;
  fillColor: string;
  strokeColor: string;
  title: string;
  city: City;
  points: Point[];
}

export interface Race {
  id: number;
  duration: number;
  startTime: number;
}

export interface GameUser {
  id: number;
}

export enum FieldType {
  input, select, color
}

