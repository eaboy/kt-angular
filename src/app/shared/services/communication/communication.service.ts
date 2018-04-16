import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';
import { environment } from 'environments/environment';

@Injectable()
export class CommunicationService {

    constructor(private _http: HttpClient, private _cookieService: CookieService) { }

    private setHeaders() {
        const httpOptions = {
            // headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this._cookieService.get('token')}` })
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        };
        return httpOptions;
    }
    private baseUrl = environment.apiUrl;

    getData(url: string): Observable<any> {
        return this._http.get(this.baseUrl + url, this.setHeaders());
    }

    postData(url: string, body: object): Observable<any> {
        return this._http.post(this.baseUrl + url, body, this.setHeaders());
    }

    editData(url: string, body: object): Observable<any> {
        return this._http.put(this.baseUrl + url, body, this.setHeaders());
    }

    deleteData(url: string): Observable<any> {
        return this._http.delete(this.baseUrl + url, this.setHeaders());
    }

}
