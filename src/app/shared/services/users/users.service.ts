import { Injectable, Output, EventEmitter } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Login, User } from '@interfaces/users';
import { AuthService } from '@services/auth/auth.service';
import * as jwt_decode from 'jwt-decode';
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
  private logoutPath = `/logout/`;
  private recuperarPasswordPath = '/recuperarPassword/';
  private enviarEmailPath = '/sendEmailPassword/';
  private eliminarUsuarioPath = '/deleteUser/';

  private tokenData;
  @Output() estaLogueado: EventEmitter<boolean> = new EventEmitter();


  constructor(private _communicationService: CommunicationService, private _authService: AuthService, private router: Router) {
    if (this._authService.getToken()) {
      this.checkToken();
    }
  }

  loginUser(login: Login): Observable<any> {
    return this._communicationService.postData(this.loginPath, login).pipe(map(data => {
      if (data.token) {
        this._authService.setToken(data.token);
        this.extractTokenData();
        this.estaLogueado.emit(true);
        return {success: true, message: `Successfully loged in.`};
      } else if (data.non_field_errors != null)  {
        this.estaLogueado.emit(false);
        return {success: false, message: data.non_field_errors};
      }
      return data;
    }));
  }

  logoutUser(): Observable<any> {
    this._authService.deleteToken();
    this.tokenData = null;
    this.estaLogueado.emit(false);
    return this._communicationService.getData(this.logoutPath);
  }

  getUser(): Observable<User> {
    return this._communicationService.getData(this.userPath);
  }

  updateUser(userId, user: User): Observable<any> {
    return this._communicationService.patchData(`/updateUser/` + userId, user);
  }

  isAuthenticated(): Subject<boolean> {
    return this._authService.isAuthenticated();
  }

  private checkToken(): void {
    const token = {
      'token' : this._authService.getToken()
    };
    this._communicationService.postData(this.verifyTokenPath, token).subscribe(data => {
      if (data.token) {
        this.estaLogueado.emit(true);
        this._authService.changeAuthStatus(true);
      } else {
        this.estaLogueado.emit(false);
        this._authService.changeAuthStatus(false);
        this.router.navigate(['login']);
      }
    });
  }

  private extractTokenData(): void {
    try {
      this.tokenData = jwt_decode(this._authService.getToken());
    } catch (Error) {
      console.log('Error decoding token', Error);
    }
  }

  getUserId() {
    this.extractTokenData();
    if (this.tokenData !== null && this.tokenData !== undefined) {
      return this.tokenData.user_id;
    }
    return false;
  }

  getUserName() {
    this.extractTokenData();
    if (this.tokenData !== null && this.tokenData !== undefined) {
      return this.tokenData.username;
    }
    return false;
  }


  buscarUsuario(login: Login): Observable<any> {
    return this._communicationService.postData(this.recuperarPasswordPath, login).pipe(map(data => {
      if (data.token) {
          console.log(data);
      }
      return data;
    }));
  }

  enviarEmailPassword(email: string): Observable<any> {
    return this._communicationService.getData(this.enviarEmailPath + '?email=' + email).pipe(map(data => {
      return data;
    }));
  }

  deleteUser(){
    return this._communicationService.deleteData(this.eliminarUsuarioPath ).pipe(map(data => {
      return data;
    }));
  }

}
