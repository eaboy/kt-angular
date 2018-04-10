import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

@Injectable()
export class AuthService {
  public headers: Headers = new Headers({
        'content-type': 'application/json',
        'X-CSRFToken': this.cookieservice.get('csrftoken')
      })  	

  public loginPath: string = '/login/';

  constructor(private http: Http, private cookieservice: CookieService ){}

    
	login(user): Observable <any> {
        let url: string = `${environment.apiUrl}${this.loginPath}`;
		return this.http.post(url, user, {headers: 
								 this.headers});
	}

}
