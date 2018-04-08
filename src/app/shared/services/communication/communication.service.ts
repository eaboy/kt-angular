import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunicationService {

  constructor(private _http: HttpClient) { }

  getData(url: string): Observable<any> {

    return this._http.get(url);
  }

  postData(url: string, body: object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this._http.post(url, body, httpOptions);
  }

}
