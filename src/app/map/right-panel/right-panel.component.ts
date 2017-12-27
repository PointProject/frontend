import {Component, OnInit} from '@angular/core';
import {Country, CreateObject, FieldType} from './right-panel.interfaces';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  private countries: Country[] = [];

  public createObjects: CreateObject[] = [
    {
      title: 'Country',
      initLink: '/secure/country/list',
      createLink: '/secure/country/update',
      changeFn: this.countryChange.bind(this),
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
      createLink: '',
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
      title: 'Point',
      initLink: '',
      createLink: '',
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
    }
  ];

  constructor() {
  }

  public ngOnInit(): void {
  }

  public countryChange(data: Country[]): void {
    this.countries.length = 0;
    this.countries.push(...data);
  }
}
