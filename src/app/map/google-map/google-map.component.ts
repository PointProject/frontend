import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {element} from 'protractor';
import {Zone} from './zone';

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
  @Input()
  public points: any; // FIXME Add interface
  public zone: any;
  public zonePoints: any[];
  @Input()
  public zones: any[] = []; // FIXME Add interface

  @Output()
  public onMapClick: EventEmitter<any> = new EventEmitter<any>();

  public name: string;

  private map: any;
  private markers: any[] = [];

  private figure;
  private coords = [];

  constructor() {
  }

  public ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.startLat || 0, lng: this.startLng || 0},
      zoom: this.zoom || 0
    });

    this.map.addListener('click', (event: any) => {
      /*this.markers.push(this.addMarker(event.latLng));
      this.onMapClick.emit(event);*/

      this.addPoint(event.latLng);

      //console.log(this.figure);
      //console.log('map', this.figure.getMap());
      //console.log('map2', this.figure.getMap().paths);
      //console.log('map2', this.figure.getPaths());
      //const test = this.figure.getPaths();
      //console.log('TEST', test.getArray()[0].getArray());
      /*test.forEach((element) => {
        console.log('element', element);
      });*/
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public addZone() {
    const zone = new Zone(this.map, this.name);
    this.zones.push(zone);
    this.selectZone(zone.name);
  }

  public setZone() {

  }

  public deleteZone() {

  }

  public addPoint(latLng: any) {
    this.zone.addPoint({lat: latLng.lat(), lng: latLng.lng()});
  }

  public editZone() {
    this.zone.setEditable(true);
  }

  public saveZone() {
    this.zone.setEditable(false);
  }

  public selectZone(name: string) {
    this.zone = this.zones.find((zone) => {
      return zone.name === name;
    });
  }

  private addMarker(latLng: any): any {
    /*console.log('latLng', latLng);
    this.coords.push({lat: latLng.lat(), lng: latLng.lng()});
    this.figure.setPaths(this.coords);
    const test = this.figure.getPaths();
    console.log('TEST1', test.getArray());
    console.log('TEST2', test.getArray()[0].getArray());
    test.forEach((element) => {
      console.log('element', element);
    });
    return new google.maps.Marker({
      position: latLng,
      map: this.map
    });*/
  }


  private test() {

    // Construct the polygon.
    this.figure = new google.maps.Polygon({
      paths: this.coords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: true
    });

    this.figure.setMap(this.map);
  }
}
