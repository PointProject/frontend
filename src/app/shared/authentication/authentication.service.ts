import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {filter, switchMap} from 'rxjs/operators';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthenticationEvents} from '../../app.constants';

@Injectable()
export class AuthenticationService {

  public authenticationObject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public $authenticationEvent: Observable<string> = this.authenticationObject.asObservable().pipe(
    filter((value: string) => value !== null)
  );

  constructor(private apiService: ApiService, private userService: UserService) {
  }

  public login(login: string, password: string): void {
    this.apiService.post('/user/login', {login, password})
      .pipe(
        switchMap((response: { token: string }) => {
          localStorage.setItem('token', response.token);
          return this.apiService.get('/secure/user/info');
        })
      )
      .subscribe((user: User) => {
        this.userService.setUser(user);
        this.authenticationObject.next(AuthenticationEvents.LOGIN);
      }, (error) => {
      });
  }

  public logout(): void {
    this.apiService.delete('token');
    this.userService.setUser(null);
    this.authenticationObject.next(AuthenticationEvents.LOGOUT);
  }
}
