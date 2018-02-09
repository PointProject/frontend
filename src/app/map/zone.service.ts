import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Point, Zone} from './map.interfaces';

@Injectable()
export class ZoneService {
  public isEditZone = false;

  public newZoneSubject: Subject<void> = new Subject();
  public clearZoneSubject: Subject<void> = new Subject();

  public zonesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public zonesObservable: Observable<any> = this.zonesSubject
    .asObservable()
    .pipe(
      filter((zones) => zones !== null)
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
      filter((zone) => zone !== null)
    );

  public zoneOptionsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public zoneOptionsObservable: Observable<any> = this.zoneOptionsSubject
    .asObservable()
    .pipe(
      filter((options) => options !== null)
    );
}
