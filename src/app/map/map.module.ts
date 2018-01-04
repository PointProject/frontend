import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapComponent} from './google-map/google-map.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MapComponent} from './map.component';
import {RightPanelComponent} from './right-panel/right-panel.component';
import {RightPanelService} from './right-panel/right-panel.service';
import {CreateComponent} from './right-panel/create/create.component';
import {MapService} from './map.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GoogleMapComponent,
    MapComponent,
    RightPanelComponent,
    CreateComponent
  ],
  providers: [
    RightPanelService,
    MapService
  ]
})
export class MapModule {
}
