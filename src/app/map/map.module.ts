import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapComponent} from './google-map/google-map.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GoogleMapComponent
  ],
  providers: [

  ]
})
export class MapModule { }
