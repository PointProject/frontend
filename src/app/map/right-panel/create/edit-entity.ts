import {CreateObject, Field, FieldType} from '../../map.interfaces';

export class EditEntity implements CreateObject {

  public fields: Field[] = [];
  public data: any[] = [];

  constructor(public title, public initLink, public createLink) {

  }

  // ---------------------------------------Field-----------------------------------------------------------------------

  public addField(type: FieldType, name: string, id: string, data?: any) {
    this.fields.push({
      id,
      name,
      type,
      data
    });
  }

  public setFieldData(id: string, data: any[]) {
    this.fields.find((field: Field) => field.id === id).data = data;
  }

  // ---------------------------------------Hooks-----------------------------------------------------------------------

  public beforeSave(data: any): void {
  }

  public onDataLoaded(data: any): void {
  }

  public onSelectItem(data: any): void {
  }

  public onToggleEdit(isEdit: boolean): void {
  }

  public createNewInstance(): void {
  }

  // -------------------------------------------------------------------------------------------------------------------
}
