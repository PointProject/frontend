import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {element} from 'protractor';
import {MapZone} from './zone';
import {MapService} from '../map.service';
import {Zone} from '../map.interfaces';

declare let google: any;

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

  public zones: Zone[] = [];

  public currentMapZone: MapZone;

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

      if (this.currentMapZone) {
        this.currentMapZone.addPoint(event.latLng);
      }
    });

    this.mapService.zonesObservable.subscribe((zones: Zone[]) => {
      this.zones = zones;
      this.zones.forEach((zone: Zone) => {
        new MapZone(this.map, zone);
      });
      console.log(this.zones);
    });

    this.mapService.newZonesSubject.subscribe(() => {
      this.currentMapZone = new MapZone(this.map);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

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
}
