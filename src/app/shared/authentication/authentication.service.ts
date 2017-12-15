import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';

@Injectable()
export class AuthenticationService {

  constructor(private apiService: ApiService, private userService: UserService) {
  }

  public login(login: string, password: string) {
    this.apiService.post('/user/login', {login, password})
      .pipe(switchMap((response: { token: string }) => {
        localStorage.setItem('token', response.token);
        return this.apiService.get('/secure/user/info');
      }))
      .subscribe((user: User) => {
        this.userService.setUser(user);
      }, (error) => {
      });
  }

  public logout() {
    this.apiService.delete('token');
    this.userService.setUser(null);
  }
}
