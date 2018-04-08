import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class CommunicationService {

    constructor(private _http: HttpClient, private _authService: AuthService) { }

    private setHeaders() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this._authService.token}` })
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
