import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';

@Injectable()
export class MapService {

  public isEditPoint = false;

  public editPointSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public editPointObservable: Observable<any> = this.editPointSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

  public pointsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public pointsObservable: Observable<any> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

  constructor() {
  }
}
