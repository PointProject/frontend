import {NgModule} from '@angular/core';
import {ApiModule} from './api/api.module';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthenticationModule} from './authentication/authentication.module';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    AuthenticationModule
  ],
  declarations: [AuthenticationComponent],
  exports: [
    ApiModule,
    AuthenticationModule
  ],
  providers: []
})

export class SharedModule {
}
