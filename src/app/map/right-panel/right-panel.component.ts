import {Component, OnInit} from '@angular/core';
import {City, Country, CreateObject, FieldType, Race, Zone} from '../map.interfaces';
import {MapService} from '../map.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  private countries: Country[] = [];
  private cities: City[] = [];
  private zones: Zone[] = [];
  private races: Race[] = [];

  public createObjects: CreateObject[] = [
    {
      title: 'Country',
      initLink: '/secure/country/list',
      createLink: '/secure/country/update',
      dataUpdated: this.countriesUpdated.bind(this),
      fields: [
        {
          type: FieldType.input,
          name: 'Id',
          id: 'id'
        },
        {
          type: FieldType.input,
          name: 'Title',
          id: 'title'
        }
      ]
    },
    {
      title: 'City',
      initLink: '/secure/city/list',
      createLink: '/secure/city/update',
      dataUpdated: this.citiesUpdated.bind(this),
      fields: [
        {
          type: FieldType.input,
          name: 'Id',
          id: 'id'
        },
        {
          type: FieldType.input,
          name: 'Title',
          id: 'title'
        },
        {
          type: FieldType.select,
          name: 'Country',
          id: 'country',
          data: this.countries
        }
      ]
    },
    {
      title: 'Zone',
      initLink: '/secure/zone/list',
      createLink: '/secure/zone/update',
      dataUpdated: this.zonesUpdated.bind(this),
      fields: [
        {
          type: FieldType.input,
          name: 'Id',
          id: 'id'
        },
        {
          type: FieldType.input,
          name: 'Title',
          id: 'title'
        },
        {
          type: FieldType.input,
          name: 'Fill Color',
          id: 'fillColor'
        },
        {
          type: FieldType.input,
          name: 'Stroke Color',
          id: 'strokeColor'
        },
        {
          type: FieldType.select,
          name: 'City',
          id: 'city',
          data: this.cities
        }
      ]
    },
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
  ];

  constructor(private mapService: MapService) {
  }

  public ngOnInit(): void {

  }

  public countriesUpdated(data: Country[]): void {
    this.countries.length = 0;
    this.countries.push(...data);
  }

  public citiesUpdated(data: City[]): void {
    this.cities.length = 0;
    this.cities.push(...data);
  }

  public zonesUpdated(data: Zone[]): void {
    this.zones.length = 0;
    this.zones.push(...data);
  }

  public racesUpdated(data: Race[]): void {
    this.races.length = 0;
    this.races.push(...data);
  }

  public setPointEditStatus(isEdit: boolean) {
    this.mapService.isEditPoint = isEdit;
  }
}
