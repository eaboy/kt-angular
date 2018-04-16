import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {User} from '../../beans/User';

import { CookieService } from 'angular2-cookie/core';
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
               private _formBuilder: FormBuilder,
               private _authService: AuthService) { }

  ngOnInit() {
     this.formulario = this._formBuilder.group({
          username:['', Validators.required],
          password:['', Validators.required]
     });
  }


  loginUser(){
    this._authService.login(this.formulario.value).subscribe(data =>{
      if(data.status==200){
        if(data.json()['status']=='success'){
          this.cookieservice.put('token', data.json()['token']);
          console.log(this.cookieservice.get('token'));
        }else{
          console.log('Invalid Credentials');
        }
      }else{
        console.log("Some error occured")
      }
    });	
  }

}
