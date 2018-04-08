import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {User} from '../beans/User';

import { CookieService } from 'angular2-cookie/core';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;
  formulario: FormGroup;

  constructor( private cookieservice: CookieService,
               private auth: LoginService,
               private _formBuilder: FormBuilder) { }

  ngOnInit() {
     this.formulario = this._formBuilder.group({
          user:['', Validators.required],
          password:['', Validators.required]
     });
  }


  LoginUser(){

    console.log(this.user);
    //this.user.usuario = this.formulario.get('user').value;
    //this.user.password = this.formulario.get('password').value;
    this.auth.login(this.user).subscribe(data =>{
      console.log(data);
    /*  if(data.status==200){
        if(data.json()['status']=='success'){
          this.cookieservice.put('token', data.json()['token']);
        }else{
          console.log('Invalid Credentials');
        }
      }
      else{
        console.log("Some error occured")
      }
*/

    })
  	
  }
    get diagnostic() { return JSON.stringify(this.user); }




}
