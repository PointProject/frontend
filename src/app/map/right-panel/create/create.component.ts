import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateObject, Field, FieldType} from '../../map.interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnChanges {

  @Input()
  public createObject: CreateObject;

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
    this.createObject.fields.forEach((field: Field) => {
      controlsConfig[field.id] = [];
    });
    this.formGroup = this.formBuilder.group(controlsConfig);

    this.formGroup.valueChanges
      .subscribe((change) => {
        this.editObject = change;
      });

    this.chooseFormControl.valueChanges
      .subscribe((value: any) => {
        Object.keys(this.formGroup.controls).forEach((key: string) => {
          this.formGroup.controls[key].setValue(value[key]);
        });
      });
  }

  public fetchData(): void {
    this.apiService.get(this.createObject.initLink)
      .subscribe((response: any) => {
        this.createObject.data = response;
        if (this.createObject.dataUpdated) {
          this.createObject.dataUpdated(response);
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public create(): void {
    this.apiService.post(this.createObject.createLink, this.editObject).subscribe(() => {
      this.fetchData();
    });
  }

  public clear(): void {
    this.formGroup.reset();
  }

  public clearField(id: string) {
    this.formGroup.controls[id].reset();
  }

  public toggleEditPanel(): void {
    this.isEdit = !this.isEdit;
    if (this.createObject.onAdd) {
      this.createObject.onAdd();
    }

    if (this.createObject.onEditToggle) {
      this.createObject.onEditToggle(this.isEdit);
    }
  }
}
