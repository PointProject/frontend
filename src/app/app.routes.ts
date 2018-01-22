import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {GoogleMapComponent} from './map/google-map/google-map.component';
import {MapComponent} from './map/map.component';
import {AuthenticationGuard} from './shared/authentication/authentication.guard';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/map'
  },
  {
    path: 'login',
    component: LoginComponent
  },
 /* {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthenticationGuard]
  },*/
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthenticationGuard]
  }
];
