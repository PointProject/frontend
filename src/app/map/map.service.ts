import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Point, PointEvents, Zone} from './map.interfaces';

@Injectable()
export class MapService {

  constructor() {
  }

  // ------------------------------------------Zone---------------------------------------------------------------------

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


  // --------------------------------------------Point------------------------------------------------------------------

  public isEditPoint = false;

  public pointsSubject: Subject<{ event: PointEvents, data: any }> = new Subject();
  public $pointSelectZone: Observable<Zone> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((pointEvent: { event: PointEvents, data: any }) =>
        pointEvent.event === PointEvents.SELECT_ZONE && pointEvent.data !== null),
      map((pointEvent: { event: PointEvents, data: any }) => pointEvent.data),
      distinctUntilChanged()
    );

  public $pointEdit: Observable<{ lat: number, lng: number }> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((pointEvent: { event: PointEvents, data: any }) => pointEvent.event === PointEvents.EDIT_POINT),
      map((pointEvent: { event: PointEvents, data: any }) => pointEvent.data)
    );
}
