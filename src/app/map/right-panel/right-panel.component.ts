import {Component, OnInit} from '@angular/core';
import {City, Country, FieldType, Point, Zone} from '../map.interfaces';
import {MapService} from '../map.service';
import {EditEntity} from './create/edit-entity';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  private zonePoints: Point[];

  public countryEntity: EditEntity;
  public cityEntity: EditEntity;
  public zoneEntity: EditEntity;
  public raceEntity: EditEntity;
  public pointEntity: EditEntity;

  constructor(private mapService: MapService) {
  }

  public ngOnInit(): void {
    this.mapService.zonePointsObservable.subscribe((points: Point[]) => {
      this.zonePoints = points;
    });

    this.initCountryEntity();
    this.initCityEntity();
    this.initZoneEntity();
    this.initRaceEntity();
    this.initPointEntity();
  }

  public initCountryEntity() {
    this.countryEntity = new EditEntity(
      'Country',
      '/secure/country/list',
      '/secure/country/update'
    );

    this.countryEntity.addField(FieldType.input, 'Id', 'id');
    this.countryEntity.addField(FieldType.input, 'Title', 'title');
    this.countryEntity.onDataLoaded = (data: any[]) => {
      this.cityEntity.setFieldData('country', data);
    };
  }

  public initCityEntity() {
    this.cityEntity = new EditEntity(
      'City',
      '/secure/city/list',
      '/secure/city/update'
    );

    this.cityEntity.addField(FieldType.input, 'Id', 'id');
    this.cityEntity.addField(FieldType.input, 'Title', 'title');
    this.cityEntity.addField(FieldType.select, 'Country', 'country');
    this.cityEntity.onDataLoaded = (data: any[]) => {
      this.zoneEntity.setFieldData('city', data);
    };
  }

  public initZoneEntity() {
    this.zoneEntity = new EditEntity(
      'Zone',
      '/secure/zone/list',
      '/secure/zone/update'
    );

    this.zoneEntity.addField(FieldType.input, 'Id', 'id');
    this.zoneEntity.addField(FieldType.input, 'Title', 'title');
    this.zoneEntity.addField(FieldType.color, 'Fill Color', 'fillColor');
    this.zoneEntity.addField(FieldType.color, 'Stroke Color', 'strokeColor');
    this.zoneEntity.addField(FieldType.select, 'City', 'city');

    this.zoneEntity.onSelectItem = (zone: Zone) => {
      this.mapService.zoneSelectSubject.next(zone);
    };

    this.zoneEntity.beforeSave = (dataObject: any) => {
      dataObject.points = this.zonePoints;
    };

    this.zoneEntity.onDataLoaded = (zones: Zone[]) => {
      this.mapService.zonesSubject.next(zones);
    };

    this.zoneEntity.createNewInstance = () => {
      this.mapService.newZoneSubject.next();
    };

    this.zoneEntity.onClear = () => {
      this.mapService.clearZoneSubject.next();
    };

    this.zoneEntity.onToggleEdit = (isEdit: boolean) => {
      this.mapService.isEditZone = isEdit;
    };

    this.zoneEntity.valueChanges = (data: any) => {
      this.mapService.zoneOptionsSubject.next({
        fillColor: data.fillColor,
        strokeColor: data.strokeColor
      });
    };
  }

  public initRaceEntity() {
    this.raceEntity = new EditEntity(
      'Race',
      '/secure/race/list',
      '/secure/race/update'
    );

    this.raceEntity.addField(FieldType.input, 'Id', 'id');
    this.raceEntity.addField(FieldType.input, 'Duration', 'duration');
    this.raceEntity.addField(FieldType.input, 'Start time', 'startTime');
  }

  public initPointEntity() {
    this.pointEntity = new EditEntity(
      'Point',
      '/secure/moneypoint/list',
      '/secure/moneypoint/update'
    );

    this.pointEntity.addField(FieldType.input, 'Id1', 'id');
    this.pointEntity.addField(FieldType.input, 'Is activated', 'isActivated');
    this.pointEntity.addField(FieldType.input, 'Latitude', 'latitude');
    this.pointEntity.addField(FieldType.input, 'Longitude', 'longitude');
    this.pointEntity.addField(FieldType.input, 'Value', 'value');
    this.pointEntity.addField(FieldType.input, 'Game Use', 'gameUser');
    this.pointEntity.addField(FieldType.input, 'Race', 'race');
    this.pointEntity.addField(FieldType.input, 'Zone', 'zone');
  }

  public setPointEditStatus(isEdit: boolean) {
    this.mapService.isEditPoint = isEdit;
  }
}
