import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  private apiHost = 'http://18.220.89.28:8080';

  constructor(private httpClient: HttpClient) {

  }

  public get(path: string, options: any = {}): Observable<Object> {
    return this.httpClient.get(this.getPath(path), this.getOptions(options));
  }

  public put(path: string, body: any, options: any = {}): Observable<Object> {
    return this.httpClient.put(this.getPath(path), body, this.getOptions(options));

  }

  public delete(path: string, options: any = {}): Observable<Object> {
    return this.httpClient.delete(this.getPath(path), this.getOptions(options));

  }

  public post(path: string, body: any, options: any = {}): Observable<Object> {
    return this.httpClient.post(this.getPath(path), body, this.getOptions(options));
  }

  private getPath(path: string): string {
    return `${this.apiHost}${path}`;
  }

  private getOptions(options: any): any {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    options.headers = headers;
    return options;
  }
}
