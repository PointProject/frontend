import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginComponent} from './login/login.component';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {MapModule} from './map/map.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {useHash: true}),
    BrowserModule,
    MapModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    UserModule
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
