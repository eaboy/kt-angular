import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from "@services/users/users.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  
  formulario: FormGroup;
  public displayError: String = null;


  constructor(private _userService: UsersService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formulario = this._formBuilder.group({
      user:['', Validators.required]
    });
  }

  recuperarPassword(){
    this._userService.buscarUsuario(this.formulario.value).subscribe(data =>{
      console.log(data);
      if(data === false) {
        this.displayError = 'No se ha encontrado ningún usuario con ese nombre o ese email en CoderText.';  
      }else{
        this.router.navigate(['']);
      }
    });	
  }

}
