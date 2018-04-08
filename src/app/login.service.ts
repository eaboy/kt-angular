import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Headers} from '@angular/http';
import { User } from "./beans/User";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class LoginService {


  public headers: Headers = new Headers({
        'content-type': 'application/json',
        'X-CSRFToken': this._cookieservice.get('csrftoken')
  })  	


  constructor(private _httpClient: HttpClient, private _cookieservice: CookieService) { }



  login(user: User): Observable<JSON> {
     let url: string = '/login/';
     return this._httpClient.post<JSON>(`${environment.rutaAPi}${url}`, user);
 }



}
