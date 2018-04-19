import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {PointEvents, Zone} from './map.interfaces';
import {Injectable} from '@angular/core';
import {Point} from './google-map/marker';

@Injectable()
export class PointService {
  public currentPoint: Point;
  public isEditPoint = false;

  public pointsSubject: Subject<{ event: PointEvents, data: any }> = new Subject();
  public pointSelectZone$: Observable<Zone> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((pointEvent: { event: PointEvents, data: any }) =>
        pointEvent.event === PointEvents.SELECT_ZONE && pointEvent.data !== null),
      map((pointEvent: { event: PointEvents, data: any }) => pointEvent.data),
      distinctUntilChanged()
    );

  public pointEdit$: Observable<{ lat: number, lng: number }> = this.pointsSubject
    .asObservable()
    .pipe(
      filter((pointEvent: { event: PointEvents, data: any }) => pointEvent.event === PointEvents.EDIT_POINT),
      map((pointEvent: { event: PointEvents, data: any }) => pointEvent.data)
    );
}
