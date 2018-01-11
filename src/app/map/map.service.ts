import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MapService {

  public isEditPoint = false;

  public newZonesSubject: Subject<void> = new Subject();

  public zonesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public zonesObservable: Observable<any> = this.zonesSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

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
