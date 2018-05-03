import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class CommunicationService {

    constructor(private _http: HttpClient, private _authService: AuthService) { }

    private setHeaders() {
        const token = this._authService.getToken();
        let headers;
        if(environment.header && token) {
            headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
        } else {
            headers = { 'Content-Type': 'application/json' };
        }
        
        return { headers: new HttpHeaders(headers) };
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
