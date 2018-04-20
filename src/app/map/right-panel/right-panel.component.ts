import {Component, OnInit, ViewChild} from '@angular/core';
import {City, Country, FieldType, MoneyPoint, Point, PointEvents, Zone} from '../map.interfaces';
import {MapService} from '../map.service';
import {EditEntity} from './create/edit-entity';
import {CreateComponent} from './create/create.component';
import {ZoneService} from '../zone.service';
import {PointService} from '../point.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  @ViewChild('pointComponent') private pointComponent: CreateComponent;

  private zonePoints: Point[];

  public countryEntity: EditEntity;
  public cityEntity: EditEntity;
  public zoneEntity: EditEntity;
  public raceEntity: EditEntity;
  public pointEntity: EditEntity;

  constructor(private zoneService: ZoneService, private pointService: PointService) {
  }

  public ngOnInit(): void {
    this.zoneService.zonePointsObservable.subscribe((points: Point[]) => {
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
      this.zoneService.zoneSelectSubject.next(zone);
    };

    this.zoneEntity.beforeSave = (dataObject: any) => {
      dataObject.points = this.zonePoints;
    };

    this.zoneEntity.onDataLoaded = (zones: Zone[]) => {
      this.zoneService.zonesSubject.next(zones);
      this.pointEntity.setFieldData('zone', zones);
    };

    this.zoneEntity.createNewInstance = () => {
      this.zoneService.newZoneSubject.next();
    };

    this.zoneEntity.onClear = () => {
      this.zoneService.clearZoneSubject.next();
    };

    this.zoneEntity.onToggleEdit = (isEdit: boolean) => {
      this.zoneService.isEditZone = isEdit;
    };

    this.zoneEntity.valueChanges = (data: Zone) => {
      this.zoneService.zoneOptionsSubject.next({
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
    this.raceEntity.addField(FieldType.input, 'Title', 'title');
    this.raceEntity.addField(FieldType.input, 'Duration', 'duration');
    this.raceEntity.addField(FieldType.input, 'Start time', 'startTime');

    this.raceEntity.onDataLoaded = (data: any[]) => {
      this.pointEntity.setFieldData('race', data);
    };
  }

  public initPointEntity() {
    this.pointEntity = new EditEntity(
      'Point',
      '/secure/moneypoint/list',
      '/secure/moneypoint/update'
    );

    this.pointEntity.addField(
      FieldType.input,
      'Id',
      'id',
      this.pointEntity.getPointProperties(null, false, true, true)
    );
    this.pointEntity.addField(FieldType.input, 'Is activated', 'isActivated');
    this.pointEntity.addField(
      FieldType.input,
      'Latitude',
      'latitude',
      this.pointEntity.getPointProperties(null, false, true, true)
    );
    this.pointEntity.addField(
      FieldType.input,
      'Longitude',
      'longitude',
      this.pointEntity.getPointProperties(null, false, true, true)
    );
    this.pointEntity.addField(FieldType.input, 'Value', 'value');
    this.pointEntity.addField(
      FieldType.input,
      'Game User',
      'gameUser',
      this.pointEntity.getPointProperties(null, false, true, true)
    );

    this.pointEntity.addField(FieldType.select, 'Race', 'race');
    this.pointEntity.addField(FieldType.select, 'Zone', 'zone');

    this.pointEntity.valueChanges = (data: MoneyPoint) => {
      this.pointService.pointsSubject.next({
        event: PointEvents.SELECT_ZONE,
        data: data.zone
      });
    };

    this.pointService.pointEdit$.subscribe((latLng) => {
      this.pointComponent.formGroup.controls.latitude.setValue(latLng.lat);
      this.pointComponent.formGroup.controls.longitude.setValue(latLng.lng);
    });
  }

  public setPointEditStatus(isEdit: boolean) {
    this.pointService.isEditPoint = isEdit;
  }
}
