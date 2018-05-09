import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService implements CanActivate {

  private authSubj = new Subject<boolean>();
  private authenticated: boolean;

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.authenticated)
      this.router.navigate(['login']);
    else
      return true;
  }

  isAuthenticated(): Subject<boolean> {
    return this.authSubj;
  }

  changeAuthStatus(newStatus: boolean): void {
    this.authSubj.next(newStatus);
    this.authenticated = newStatus;
  }

}