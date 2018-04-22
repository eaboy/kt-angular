import { Injectable } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Login, User } from '@interfaces/users';
import { AuthService } from '@services/auth/auth.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

/* Servicio encargado de gestionar la comunicación con el API relativa al modelo users.
   Consume el servicio de comunicaciones y provee de métodos a los componentes para gestionar las acciones 
   relacionadas con los usuarios. */

@Injectable()
export class UsersService {

  private loginPath = `/token-obtain/`;
  private verifyTokenPath = `/token-verify/`;
  private userPath = `/user/`;

  private tokenData;

  constructor(private _communicationService: CommunicationService, private _authService: AuthService, private router: Router) {
    if(this._authService.getToken()) {
      this.checkToken();
    }
  }

  loginUser(login: Login): Observable<any> {
    return this._communicationService.postData(this.loginPath, login).pipe(map(data => {
      if(data.token) {
        this._authService.setToken(data.token);
        this.extractTokenData();
        return {success: true, message: `Successfully loged in.`};
      }
      return data;
    }));
  }

  logoutUser() {
    this._authService.deleteToken();
    this.tokenData = null;
  }

  getUser(): Observable<User> {
    return this._communicationService.getData(this.userPath);
  }

  updateUser(userId: number, user: User): Observable<any> {
    return this._communicationService.editData(`/updateuser/ ${userId}`, user);
  }

  isAuthenticated(): Subject<boolean> {
    return this._authService.isAuthenticated();
  }

  private checkToken(): void {
    const token = {
      'token' : this._authService.getToken()
    };
    this._communicationService.postData(this.verifyTokenPath, token).subscribe(data => {
      if(data.token){
        this._authService.changeAuthStatus(true);
      } else {
        this._authService.changeAuthStatus(false);
        this.router.navigate(['login']);
      }
    });
  }

  private extractTokenData(): void {
    try{
      this.tokenData = jwt_decode(this._authService.getToken());
    }
    catch(Error){
      console.log('Error decoding token', Error)
    }
  }

  getUserId() {
    if(this.tokenData !== null){
      return this.tokenData.user_id;
    }
    return false;
  }

  getUserName() {
    if(this.tokenData !== null){
      return this.tokenData.username;
    }
    return false;
  }

}
