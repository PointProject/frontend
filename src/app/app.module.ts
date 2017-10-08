import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {GoogleMapComponent} from './map/google-map/google-map.component';
import {MapModule} from './map/map.module';

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    MapModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
