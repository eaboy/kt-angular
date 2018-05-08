import { Injectable, Output } from '@angular/core';
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
  private userPath = `/user/`;
  private logoutPath = `/logout/`;
  private recuperarPasswordPath = '/recuperarPassword/';
  private enviarEmailPath = '/sendEmailPassword/';
  private eliminarUsuarioPath = '/deleteUser/';

  private userName: string;
  private userId: number;

  private tokenData;
  estaLogueado: Subject<boolean>;


  constructor(private _communicationService: CommunicationService, private _authService: AuthService, private router: Router) {
    this.getUserData();
    this.estaLogueado = _authService.isAuthenticated();
  }

  loginUser(login: Login): Observable<any> {
    return this._communicationService.postData(this.loginPath, login).pipe(map(data => {
      if (data.token) {
        this.getUserData();
        return {success: true, message: `Successfully loged in.`};
      } else if (data.non_field_errors != null)  {
        this._authService.changeAuthStatus(false);
        return {success: false, message: data.non_field_errors};
      }
      return data;
    }));
  }

  logoutUser(): Observable<any> {
    this._authService.changeAuthStatus(false);
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

  private getUserData(): void {
    this.getUser().subscribe(data => {
      this.userId = data[0].id;
      this.userName = data[0].username;
      this._authService.changeAuthStatus(true);
    });
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
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
