import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Point, Zone} from './map.interfaces';

@Injectable()
export class MapService {

  // ------------------------------------------Zone---------------------------------------------------------------------

  public isEditZone = false;

  public newZoneSubject: Subject<void> = new Subject();
  public clearZoneSubject: Subject<void> = new Subject();

  public zonesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public zonesObservable: Observable<any> = this.zonesSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

  public zonePointsSubject: BehaviorSubject<Point[]> = new BehaviorSubject(null);
  public zonePointsObservable: Observable<Point[]> = this.zonePointsSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

  public zoneSelectSubject: BehaviorSubject<Zone> = new BehaviorSubject(null);
  public zoneSelectObservable: Observable<Zone> = this.zoneSelectSubject
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

  // --------------------------------------------Point------------------------------------------------------------------

  public isEditPoint = false;

  public pointsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public pointsObservable: Observable<any> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((points) => points !== null)
    );

  constructor() {
  }
}
