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
}
