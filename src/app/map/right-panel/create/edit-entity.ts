import {CreateObject, Field, FieldType} from '../../map.interfaces';

export class EditEntity implements CreateObject {

  public fields: Field[] = [];
  public data: any[] = [];

  constructor(public title, public initLink, public createLink) {

  }

  // ---------------------------------------Field-----------------------------------------------------------------------

  public addField(type: FieldType,
                  name: string,
                  id: string,
                  options: {
                    data: any,
                    required: boolean,
                    isVisible: boolean,
                    disabled: boolean
                  } = this.getPointProperties()) {
    this.fields.push({
      id,
      name,
      type,
      data: options.data,
      required: options.required,
      isVisible: options.isVisible,
      disabled: options.disabled
    });
  }

  public setFieldData(id: string, data: any[]) {
    this.getFieldById(id).data = data;
  }

  public setFieldOptions() {

  }

  public getFieldById(id: string): Field {
    return this.fields.find((field: Field) => field.id === id);
  }

  public getPointProperties(data = null, required = false, isVisible = true, disabled = false) {
    return {
      data,
      required,
      isVisible,
      disabled
    };
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

  public onClear(): void {
  }

  public valueChanges(data: any): void {
  }

  // -------------------------------------------------------------------------------------------------------------------
}
