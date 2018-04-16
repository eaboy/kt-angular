import { Injectable } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { Observable } from 'rxjs/Observable';
import { Login, User } from '@interfaces/users';

/* Servicio encargado de gestionar la comunicación con el API relativa al modelo users.
   Consume el servicio de comunicaciones y provee de métodos a los componentes para gestionar las acciones 
   relacionadas con los usuarios. */

@Injectable()
export class UsersService {

  private loginPath = `/login/`;
  private userPath = `/user/`;

  constructor(private _CommunicationService: CommunicationService) {
  }

  loginUser(login: Login): Observable<any> {
      return this._CommunicationService.postData(this.loginPath, login);
  }

  getUser(): Observable<User> {
    return this._CommunicationService.getData(this.loginPath);
  }

  updateUser(userId: number, user: User): Observable<any> {
    return this._CommunicationService.editData(`/updateuser/ ${userId}`, user);
  }


}
