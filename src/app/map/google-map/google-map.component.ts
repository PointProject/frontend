import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapZone} from './zone';
import {PointEvents, Zone} from '../map.interfaces';
import {ICoord} from './google-map.interfaces';
import {PointService} from '../point.service';
import {ZoneService} from '../zone.service';
import {Point} from './marker';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnChanges {

  @Input()
  public startLat: number;
  @Input()
  public startLng: number;
  @Input()
  public zoom: number;

  @Output()
  public onMapClick: EventEmitter<any> = new EventEmitter<any>();

  public points: any;
  public mapZones: { mapZone: MapZone, zone: Zone }[] = [];
  public currentMapZone: MapZone;
  public prevPoints: ICoord[];
  public name: string;

  private map: any;
  private marker: any;
  private currentPointZone;

  constructor(private pointService: PointService, private zoneService: ZoneService) {
  }

  public ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.startLat || 0, lng: this.startLng || 0},
      zoom: this.zoom || 5
    });

    this.map.addListener('click', (event: any) => {
      this.editMarker(event.latLng);

      if (this.currentMapZone && this.zoneService.isEditZone) {
        this.currentMapZone.addPoint(event.latLng);
      }
    });

    this.zoneService.zonesObservable.subscribe((zones: Zone[]) => {
      this.initZones(zones);
    });

    this.zoneService.zoneSelectObservable.subscribe((zone: Zone) => {
      this.selectZone(zone);
    });

    this.zoneService.newZoneSubject.subscribe(() => {
      this.createNewZone();
    });

    this.zoneService.clearZoneSubject.subscribe(() => {
      this.createNewZone();
    });

    this.zoneService.zoneOptionsObservable.subscribe((options) => {
      if (this.currentMapZone) {
        this.currentMapZone.setOptions(options);
      }
    });

    this.pointService.pointSelectZone$.subscribe((zone: Zone) => {
      if (this.pointService.currentPoint) {
        this.pointService.currentPoint.hidePoint();
        this.pointService.currentPoint = null;
      }

      const mapZone: MapZone = this.getMapZoneById(zone.id).mapZone;
      this.focusOnZone(mapZone);

      if (this.currentPointZone) {
        this.currentPointZone.mapZone.clickOnZone = () => {
        };
      }

      mapZone.clickOnZone = (event) => {
        if (!this.pointService.currentPoint) {
          this.pointService.currentPoint = new Point(this.map, {lat: event.latLng.lat(), lng: event.latLng.lng()});
        } else {
          this.pointService.currentPoint.setPosition(event.latLng.lat(), event.latLng.lng());
        }

        this.pointService.pointsSubject.next({
          event: PointEvents.EDIT_POINT,
          data: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        });
      };
      this.currentPointZone = {zone, mapZone};
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  // --------------------------------------------Zone-------------------------------------------------------------------

  private initZones(zones: Zone[]): void {
    this.removeAllZones();
    zones.forEach((zone: Zone) => {
      this.mapZones.push({
        mapZone: new MapZone(this.zoneService, this.map, zone),
        zone
      });
    });
  }

  private selectZone(zone: Zone): void {
    const foundZone: any = this.getMapZoneById(zone.id);

    if (this.currentMapZone) {
      this.currentMapZone.setEditable(false);
      this.currentMapZone.setPoints(this.prevPoints);
    }

    if (!foundZone) {
      this.createNewZone();
    } else {
      this.currentMapZone = foundZone.mapZone;
      this.currentMapZone.setEditable(true);

      this.prevPoints = this.currentMapZone.getPoints().getArray().map((element: any) => ({
        lat: element.lat(),
        lng: element.lng()
      }));
    }

    this.focusOnZone(this.currentMapZone);
  }

  private createNewZone(): void {

    if (this.currentMapZone) {
      this.currentMapZone.setEditable(false);
      this.currentMapZone.setPoints(this.prevPoints);
    }

    this.currentMapZone = new MapZone(this.zoneService, this.map);
    this.currentMapZone.setEditable(true);
    this.prevPoints = [];
  }

  private removeAllZones(): void {
    if (this.currentMapZone) {
      this.currentMapZone.clearPointsList();
    }

    this.mapZones.forEach((mapZone: any) => {
      mapZone.mapZone.clearPointsList();
    });

    this.mapZones = [];
  }

  private focusOnZone(zone: MapZone) {
    const center: any = zone.getCenter();
    if (center) {
      this.map.setCenter(center);
      this.map.setZoom(13);
    }
  }

  private getMapZoneById(id: number) {
    return this.mapZones.find((mapZones: any) => mapZones.zone.id === id);
  }

  // --------------------------------------------Marker-----------------------------------------------------------------

  private addMarker(latLng: any): any {
    return new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }

  private editMarker(latLng: any): void {
    if (this.pointService.isEditPoint) {
      if (this.marker) {
        this.marker.setPosition(latLng);
      } else {
        this.marker = this.addMarker(latLng);
      }
    }
  }

  private createRandomMarker(zone): void {
    console.log('START', zone);
    let bounds = new google.maps.LatLngBounds();
    zone.getPoints().getArray();

    for (let i = 0; i < zone.getPoints().getLength(); i++) {
      bounds.extend(zone.getPoints().getAt(i));
    }

    let sw = bounds.getSouthWest();
    let ne = bounds.getNorthEast();

    for (let i = 0; i < 100; i++) {
      let ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
      let ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
      let point = new google.maps.LatLng(ptLat, ptLng);
      if (google.maps.geometry.poly.containsLocation(point, zone.polygon)) {
        let marker = new google.maps.Marker({position: point, map: this.map});
        console.log('new marker', marker);
      }
    }

  }

  // -------------------------------------------------------------------------------------------------------------------
}
