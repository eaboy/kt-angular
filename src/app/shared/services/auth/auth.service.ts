import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private _token = '';

    constructor() { }

    get token(): string {
        return this._token
    }

    set token(newToken) {
        this._token = newToken;
    }

}
