import { Injectable } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Login, User } from '@interfaces/users';
import { AuthService } from '@services/auth/auth.service';

/* Servicio encargado de gestionar la comunicación con el API relativa al modelo users.
   Consume el servicio de comunicaciones y provee de métodos a los componentes para gestionar las acciones 
   relacionadas con los usuarios. */

@Injectable()
export class UsersService {

  private loginPath = `/token-obtain/`;
  private userPath = `/user/`;

  constructor(private _CommunicationService: CommunicationService, private _authService: AuthService) {
  }

  loginUser(login: Login): Observable<any> {
    return this._CommunicationService.postData(this.loginPath, login).pipe(map(data => {
      if(data.token) {
        this._authService.token = data.token;
        return `Successfully loged in.`
      }
      return data;
    }));
  }

  logoutUser() {
    this._authService.deleteToken();
  }

  getUser(): Observable<User> {
    return this._CommunicationService.getData(this.userPath);
  }

  updateUser(userId: number, user: User): Observable<any> {
    return this._CommunicationService.editData(`/updateuser/ ${userId}`, user);
  }


}
