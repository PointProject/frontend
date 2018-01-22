import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {filter, finalize, switchMap} from 'rxjs/operators';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthenticationEvents} from '../../app.constants';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  private _isAuthenticated = false;

  public authenticationObject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public $authenticationEvent: Observable<string> = this.authenticationObject.asObservable().pipe(
    filter((value: string) => value !== null)
  );

  constructor(private apiService: ApiService,
              private userService: UserService,
              private router: Router) {
    this.$authenticationEvent.subscribe((event: AuthenticationEvents) => {
      if (event === AuthenticationEvents.LOGOUT) {
        this.isAuthenticated = false;
      }
    });
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
        this.isAuthenticated = true;
        this.router.navigate(['/map']);
      }, (error) => {
        this.isAuthenticated = false;
      });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.userService.setUser(null);
    this.authenticationObject.next(AuthenticationEvents.LOGOUT);
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated || !!localStorage.getItem('token');
  }

  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
}
