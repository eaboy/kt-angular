import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '@services/users/users.service';
import { Login } from '@interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  formulario: FormGroup;
  displayError: String = null;
  verPassword: boolean = false;

  constructor( private _userService: UsersService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this._userService.isAuthenticated().subscribe(data => {
      if(data) {
        this.router.navigate(['']);
      }
    });
    this.formulario = this._formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }

  loginUser(){
    this._userService.loginUser(this.formulario.value).subscribe(data =>{
      console.log(data);
      if(data.success) {
        this.router.navigate(['']);
      }else{
        this.displayError = data.message;
      }
    });	
  }

  viewPassword() {
    
    this.verPassword = !this.verPassword;

  }


}
