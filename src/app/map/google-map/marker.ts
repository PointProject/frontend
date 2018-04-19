export class Point {

  private _lat: number;
  private _lng: number;

  public marker;

  constructor(public map: any, latLng: { lat: number, lng: number }) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'test'
    });
  }

  public set lat(value: number) {
    this._lat = value;
    this.updatePosition();
  }

  public set lng(value: number) {
    this._lng = value;
    this.updatePosition();
  }

  public updatePosition() {
    this.setPosition(this._lat, this._lng);
  }

  public setPosition(lat: number, lng: number) {
    this.marker.setPosition({lat, lng});
  }

  public hidePoint() {
    this.marker.setMap(null);
  }
}
