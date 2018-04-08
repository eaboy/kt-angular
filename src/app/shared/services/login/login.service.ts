import { Injectable } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    private loginPath = `/login/`;

    constructor(private _CommunicationService: CommunicationService) {
    }

    login(user): Observable<any> {
        return this._CommunicationService.postData(`${environment.apiUrl}${this.loginPath}`, user);
    }

}
