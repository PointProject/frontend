import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
  @Input()
  public zones: any; // FIXME Add interface

  @Output()
  public onMapClick: EventEmitter<any> = new EventEmitter<any>();

  private map: any;
  private markers: any[] = [];

  constructor() {
  }

  public ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.startLat || 0, lng: this.startLng || 0},
      zoom: this.zoom || 0
    });

    this.map.addListener('click', (event: any) => {
      this.markers.push(this.addMarker(event.latLng));
      this.onMapClick.emit(event);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private addMarker(latLng: any): any {
    return new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }
}
