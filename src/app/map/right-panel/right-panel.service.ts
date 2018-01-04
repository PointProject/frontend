import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api/api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RightPanelService {

  constructor(private apiService: ApiService) {
  }

  public getCountries(): Observable<any> {
    return this.apiService.get('/secure/country/list');
  }

  public createCountry(country: any): Observable<any> {
    return this.apiService.post('/secure/country/update', country);
  }

  public getCities(): Observable<any> {
    return this.apiService.get('/secure/city/list');
  }

  public getZones(): Observable<any> {
    return this.apiService.get('/secure/zone/list');
  }
}
