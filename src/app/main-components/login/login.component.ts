import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '@services/users/users.service';
import { Login } from '@interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: Login;
  formulario: FormGroup;

  constructor( private _userService: UsersService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
     this.formulario = this._formBuilder.group({
          username:['', Validators.required],
          password:['', Validators.required]
     });
  }

  loginUser(){
    this._userService.loginUser(this.formulario.value).subscribe(data =>{
      console.log(data);
    });	
  }

}
