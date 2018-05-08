import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from "@services/users/users.service";
import { User } from "@interfaces/users";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  
  formulario: FormGroup;
  public displayError: String = null;
  public usuarioRecuperado: User = null;

  constructor(private _userService: UsersService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formulario = this._formBuilder.group({
      user:['', Validators.required]
    });
  }

  recuperarPassword(){
    this._userService.buscarUsuario(this.formulario.value).subscribe(data =>{
      if(data === false) {
        this.usuarioRecuperado = null;
        this.displayError = 'No se ha encontrado ningún usuario con ese nombre o ese email en CoderText.';  
      }else{
        this.usuarioRecuperado = data[0];
        this.usuarioRecuperado.emailOfuscado = this.censorEmail(this.usuarioRecuperado.email);
      }
    });	
  }

  enviarEmail(){
    this._userService.enviarEmailPassword(this.usuarioRecuperado.email).subscribe(data =>{
      this.router.navigate(['']);
    });	
  }


  censorWord(str) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  }

  censorEmail(email){
      var arr = email.split("@");
      return this.censorWord(arr[0]) + "@" + this.censorWord(arr[1]);
  }

}
