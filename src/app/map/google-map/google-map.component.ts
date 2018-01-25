import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapZone} from './zone';
import {MapService} from '../map.service';
import {Zone} from '../map.interfaces';
import {ICoord} from './google-map.interfaces';

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
  public mapZones: any[] = [];
  public currentMapZone: MapZone;
  public prevPoints: ICoord[];
  public name: string;

  private map: any;
  private point: any;

  constructor(private mapService: MapService) {
  }

  public ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.startLat || 0, lng: this.startLng || 0},
      zoom: this.zoom || 5
    });

    this.map.addListener('click', (event: any) => {
      this.editPoint(event.latLng);

      if (this.currentMapZone && this.mapService.isEditZone) {
        this.currentMapZone.addPoint(event.latLng);
      }
    });

    this.mapService.zonesObservable.subscribe((zones: Zone[]) => {
      this.initZones(zones);
    });

    this.mapService.zoneSelectObservable.subscribe((zone: Zone) => {
      this.selectZone(zone);
    });

    this.mapService.newZoneSubject.subscribe(() => {
      this.createNewZone();
    });

    this.mapService.clearZoneSubject.subscribe(() => {
      this.createNewZone();
    });

    this.mapService.zoneOptionsObservable.subscribe((options) => {
      if (this.currentMapZone) {
        this.currentMapZone.setOptions(options);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  // --------------------------------------------Zone-------------------------------------------------------------------

  private initZones(zones: Zone[]): void {
    this.removeAllZones();
    zones.forEach((zone: Zone) => {
      this.mapZones.push({
        mapZone: new MapZone(this.mapService, this.map, zone),
        zone
      });
    });
  }

  private selectZone(zone: Zone): void {
    const foundZone: any = this.mapZones.find((mapZones: any) => mapZones.zone.id === zone.id);

    if (this.currentMapZone) {
      this.currentMapZone.setEditable(false);
      this.currentMapZone.clearListeners();
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

    this.currentMapZone.setListener((a) => {
    });

    this.focusOnZone(this.currentMapZone);
  }

  private createNewZone(): void {

    if (this.currentMapZone) {
      this.currentMapZone.setEditable(false);
      this.currentMapZone.clearListeners();
      this.currentMapZone.setPoints(this.prevPoints);
    }

    this.currentMapZone = new MapZone(this.mapService, this.map);
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

  // --------------------------------------------Point------------------------------------------------------------------

  private addPoint(latLng: any): any {
    return new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }

  private editPoint(latLng: any): void {
    if (this.mapService.isEditPoint) {
      if (this.point) {
        this.point.setPosition(latLng);
      } else {
        this.point = this.addPoint(latLng);
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
}
