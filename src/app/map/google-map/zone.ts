import {ICoord} from './google-map.interfaces';
import {Point, Zone} from '../map.interfaces';

declare let google: any;

export class MapZone {

  private points: ICoord[] = [];
  private polygon: any;

  constructor(public map: any, public zone?: Zone) {
    this.initZone();
    this.polygon.setMap(this.map);

    if (this.zone) {
      this.points = this.zone.points.map((point: Point) => {
        return {lat: point.latitude, lng: point.longitude};
      });
      this.polygon.setPath(this.points);
    }
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
