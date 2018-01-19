import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/authentication/authentication.service';
import {ApiService} from '../shared/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string;
  public password: string;

  constructor(private authenticationService: AuthenticationService,
              private apiService: ApiService) {
  }

  public ngOnInit() {
    this.authenticationService.logout();
  }

  public onLogIn(): void {
    this.authenticationService.login(this.login, this.password);
  }
}
