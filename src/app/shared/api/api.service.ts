import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ServerStatus} from '../../app.constants';

@Injectable()
export class ApiService {

  private apiHost = 'http://18.220.89.28:8080';

  // private apiHost = 'http://127.0.0.1:8080';

  constructor(private httpClient: HttpClient,
              private router: Router) {

  }

  public get(path: string, options: any = {}): Observable<Object> {
    return this.httpClient.get(this.getPath(path), this.getOptions(options))
      .pipe(tap(null, (response) => this.responseError(response)));
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

  private responseError(response: HttpResponse<any>) {
    if (response.status === ServerStatus.UNAUTHORIZED) {
      this.router.navigate(['/login']);
    }
  }
}
