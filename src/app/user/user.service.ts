import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';

@Injectable()
export class UserService {

  public userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public $user: Observable<any> = this.userSubject.asObservable().pipe(
    filter(value => value !== null));

  constructor() {
  }

  public setUser(user: User) {
    this.userSubject.next(user);
  }

}
