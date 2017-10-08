import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapComponent} from './google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GoogleMapComponent
  ]
})
export class MapModule { }
