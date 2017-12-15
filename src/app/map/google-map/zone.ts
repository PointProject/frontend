import {ICoord} from './google-map.interfaces';

declare let google: any;

export class Zone {

  private points: ICoord[] = [];
  private zone: any;
  private polygon: any;

  constructor(public map: any, public name) {
    this.initZone();
    this.polygon.setMap(this.map);
  }

  private initZone() {
    this.polygon = new google.maps.Polygon({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: false
    });
  }

  public addPoint(point: ICoord) {
    this.points.push(point);
    this.polygon.setPaths(this.points);
  }

  public removePoint() {

  }

  public setEditable(isEditable: boolean) {
    this.polygon.setEditable(isEditable);
  }
}
