import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CookieService } from "ngx-cookie";

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
    return this._cookieService.get('codertext');
  }

  setToken(token): void {
    this._cookieService.put('codertext', token, {httpOnly: false} );
    this.changeAuthStatus(true);
  }

  deleteToken(): void {
    this._cookieService.remove('codertext');
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