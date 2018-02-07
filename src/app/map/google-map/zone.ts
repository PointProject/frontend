import {ICoord} from './google-map.interfaces';
import {Point, Zone} from '../map.interfaces';
import {MapService} from '../map.service';

export class MapZone {

  private points: ICoord[] = [];
  private polygon: any;

  constructor(public mapService: MapService, public map: any, public zone?: Zone) {
    this.initZone();
    this.polygon.setMap(this.map);

    if (this.zone) {
      this.points = this.zone.points
        .sort((a: Point, b: Point) => a.numberInSequence - b.numberInSequence)
        .map((point: Point) => {
          return {lat: point.latitude, lng: point.longitude};
        });
      this.setPoints(this.points);
      this.setOptions({
        strokeColor: this.zone.strokeColor,
        fillColor: this.zone.fillColor
      });
    }

    this.setListeners();
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
    this.setPoints(this.points);
  }

  public setPoints(points: ICoord[]) {
    this.polygon.setPath(points);
    this.updatePoints();
  }

  public setOptions(options: any) {
    this.polygon.setOptions(options);
  }

  public updatePoints(): void {
    this.createZonePoints();

    google.maps.event.addListener(this.polygon.getPath(), 'insert_at', (index, obj) => {
      this.createZonePoints();
    });

    google.maps.event.addListener(this.polygon.getPath(), 'set_at', (index, obj) => {
      this.createZonePoints();
    });
  }

  public removePoint() {

  }

  public getPoints(): any {
    return this.polygon.getPath();
  }

  public setEditable(isEditable: boolean): void {
    this.polygon.setEditable(isEditable);
  }

  private createZonePoints(): void {
    this.mapService.zonePointsSubject.next(this.getPoints().getArray().map((point: any, index: number) => {
      const resultPoint: any = {
        latitude: point.lat(),
        longitude: point.lng(),
        numberInSequence: index
      };

      if (this.zone && this.zone.points[index]) {
        resultPoint.id = this.zone.points[index].id;
      }

      return resultPoint;
    }));
  }

  public setListeners(): void {
    this.polygon.addListener('click', (event) => {
      this.clickOnZone(event);
    });
  }

  // Callback
  public clickOnZone(event): void {
  }

  public clearListeners(): void {
    google.maps.event.clearInstanceListeners(this.polygon);
  }

  public clearPointsList(): void {
    this.polygon.setMap(null);
  }

  public getCenter(): ICoord {
    const points: any = this.getPoints().getArray();

    if (!points.length) {
      return;
    }

    const latArray: number[] = [];
    const lngArray: number[] = [];

    points.forEach((point: any) => {
      latArray.push(point.lat());
      lngArray.push(point.lng());
    });

    const maxLat = Math.max(...latArray);
    const minLat = Math.min(...latArray);
    const maxLng = Math.max(...lngArray);
    const minLng = Math.min(...lngArray);

    return {
      lat: minLat + ((maxLat - minLat) / 2),
      lng: minLng + ((maxLng - minLng) / 2)
    };
  }
}
