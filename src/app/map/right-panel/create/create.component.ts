import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateObject, Field, FieldType} from '../../map.interfaces';
import {MapService} from '../../map.service';
import {EditEntity} from './edit-entity';
import {Utils} from '../../../shared/utils';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnChanges {

  @Input()
  public editEntity: EditEntity;

  public formGroup: FormGroup;
  public chooseFormControl: FormControl = new FormControl;

  public isEdit = false;
  public fieldType = FieldType;

  private editObject: any;

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder) {
  }

  public ngOnInit() {
    this.fetchData();
    const controlsConfig: any = {};

    this.editEntity.fields.forEach((field: Field) => {
      controlsConfig[field.id] = [];
    });

    this.formGroup = this.formBuilder.group(controlsConfig);

    this.formGroup.valueChanges
      .subscribe((change) => {
        this.editObject = change;
      });

    this.chooseFormControl.valueChanges
      .subscribe((value: any) => {

        if (!value) {
          return;
        }

        this.editEntity.onSelectItem(value);
        this.toggleEditPanel(true);
        Object.keys(this.formGroup.controls).forEach((key: string) => {
          this.formGroup.controls[key].setValue(value[key]);
        });
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public fetchData(): void {
    this.apiService.get(this.editEntity.initLink)
      .subscribe((response: any) => {
        this.editEntity.data = response;
        this.editEntity.onDataLoaded(response);
      });
  }


  // ------------------------------------------Buttons------------------------------------------------------------------
  public create(): void {
    this.editEntity.beforeSave(this.editObject);

    this.apiService.post(this.editEntity.createLink, this.editObject).subscribe(() => {
      this.fetchData();
    });
  }

  public clear(): void {
    this.formGroup.reset();
    this.editEntity.onClear();
  }

  public clearField(id: string) {
    this.formGroup.controls[id].reset();
  }

  public toggleEditPanel(isEdit?: boolean): void {
    this.isEdit = Utils.isPresent(isEdit) ? isEdit : !this.isEdit;
    this.editEntity.onToggleEdit(this.isEdit);
  }

  public onClose(): void {
    this.isEdit = false;
    this.clear();
    this.editEntity.onToggleEdit(this.isEdit);
    this.chooseFormControl.reset();
  }

  public createNewInstance(): void {
    this.isEdit = true;
    this.clear();
    this.editEntity.createNewInstance();
    this.chooseFormControl.reset();
    this.editEntity.onToggleEdit(this.isEdit);
  }

  // -------------------------------------------------------------------------------------------------------------------
}
