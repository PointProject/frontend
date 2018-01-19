import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './authentication.service';
import {AuthenticationGuard} from './authentication.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    AuthenticationGuard
  ]
})
export class AuthenticationModule {

}
