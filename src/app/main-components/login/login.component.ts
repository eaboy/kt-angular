import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {User} from '../../beans/User';

import { CookieService } from 'angular2-cookie/core';
import { LoginService } from '@services/login/login.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;
  formulario: FormGroup;

  constructor( private cookieservice: CookieService,
               private _loginService: LoginService,
               private _formBuilder: FormBuilder,
               private _authService: AuthService) { }

  ngOnInit() {
     this.formulario = this._formBuilder.group({
          username:['', Validators.required],
          password:['', Validators.required]
     });
  }


  loginUser(){

    this._loginService.login(this.formulario.value).subscribe(data =>{
      if(data.status === 'success') {
        this._authService.token = data.token;
      }

    })
  	
  }




}
