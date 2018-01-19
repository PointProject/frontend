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
  public PointEntity: EditEntity;

  /*
    {
      title: 'Race',
      initLink: '/secure/race/list',
      createLink: '/secure/race/update',
      dataUpdated: this.racesUpdated.bind(this),
      fields: [
        {
          type: FieldType.input,
          name: 'Id',
          id: 'id'
        },
        {
          type: FieldType.input,
          name: 'Duration',
          id: 'duration'
        },
        {
          type: FieldType.input,
          name: 'Start time',
          id: 'startTime'
        }
      ]
    },
    {
      title: 'Point',
      initLink: '/secure/moneypoint/list',
      createLink: '',
      onEditToggle: this.setPointEditStatus.bind(this),
      fields: [
        {
          type: FieldType.input,
          name: 'Id',
          id: 'id'
        },
        {
          type: FieldType.input,
          name: 'Is activated',
          id: 'isActivated'
        },
        {
          type: FieldType.input,
          name: 'Latitude',
          id: 'latitude'
        },
        {
          type: FieldType.input,
          name: 'Longitude',
          id: 'longitude'
        },
        {
          type: FieldType.input,
          name: 'Value',
          id: 'value'
        },
        {
          type: FieldType.input,
          name: 'Game User',
          id: 'gameUser'
        },
        {
          type: FieldType.select,
          name: 'Race',
          id: 'race',
          data: this.races
        },
        {
          type: FieldType.select,
          name: 'Zone',
          id: 'zone',
          data: this.zones
        }
      ]
    }
  ];*/

  constructor(private mapService: MapService) {
  }

  public ngOnInit(): void {
    this.mapService.zonePointsObservable.subscribe((points: Point[]) => {
      this.zonePoints = points;
    });

    this.initCountryEntity();
    this.initCityEntity();
    this.initZoneEntity();
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
    this.zoneEntity.addField(FieldType.input, 'Fill Color', 'fillColor');
    this.zoneEntity.addField(FieldType.input, 'Stroke Color', 'strokeColor');
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
  }

  public initRaceEntity() {

  }

  public initPointEntity() {

  }

  public setPointEditStatus(isEdit: boolean) {
    this.mapService.isEditPoint = isEdit;
  }
}
