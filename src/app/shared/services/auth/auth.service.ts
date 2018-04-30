import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CookieService } from "angular2-cookie/services/cookies.service";

@Injectable()
export class AuthService implements CanActivate {

  private authSubj = new Subject<boolean>();
  private authenticated: boolean;

  constructor(private router: Router, private _cookieService:CookieService) {}

  canActivate(): boolean {
    if (!this.authenticated)
      this.router.navigate(['login']);
    else
      return true;
  }

  getToken(): string {
    //this._cookieService.put('token', localStorage.getItem('token'));
    //return localStorage.getItem('token');
    return this._cookieService.get('token');
  }

  setToken(token): void {
    this._cookieService.put('token', token);
    //localStorage.setItem('token', token);
    this.changeAuthStatus(true);
  }

  deleteToken(): void {
    this._cookieService.remove('token');
    //localStorage.removeItem('token');
    this.changeAuthStatus(false);
  }

  isAuthenticated(): Subject<boolean> {
    return this.authSubj;
  }

  changeAuthStatus(newStatus: boolean): void {
    this.authSubj.next(newStatus);
    this.authenticated = newStatus;
  }

}