import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class CommunicationService {

    constructor(private _http: HttpClient, private _cookieService: CookieService) { }

    private setHeaders() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this._cookieService.get('token')}` })
        };
        return httpOptions;
    }

    getData(url: string): Observable<any> {
        return this._http.get(url, this.setHeaders());
    }

    postData(url: string, body: object): Observable<any> {
        return this._http.post(url, body, this.setHeaders());
    }

    editData(url: string, body: object): Observable<any> {
        return this._http.put(url, body, this.setHeaders());
    }

    deleteData(url: string): Observable<any> {
        return this._http.delete(url, this.setHeaders());
    }

}
