import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '@services/users/users.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../interfaces/users';
import { ImageService } from '@components/images-uploader/image.service';
import { FileHolder } from '@components/images-uploader/image-upload.component';
import { LoaderViewChildComponent } from '../../shared/popup-window/loader/loader-viewchild.component';
import { ModalDeleteComponent } from '../../shared/popup-window/loader/modal-delete.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CommunicationService]
})
export class UserComponent implements OnInit {

  @ViewChild(LoaderViewChildComponent)
  popup: LoaderViewChildComponent;


  formulario: FormGroup;
  userid: number;
  nombreUsuario: string;
  listadoAdjuntos: string[];
  mensajeExito: boolean = false;
  usuarioRecuperado: User = null;

  constructor(private _formBuilder: FormBuilder,
    private _usersservice: UsersService,
    private _imagesService: ImageService) {
    this.createForm();
  }

  ngOnInit() {
    this.userid = this._usersservice.getUserId();
    this.recuperarInformacion();
  }


  private createForm(): void {
    this.formulario = this._formBuilder.group({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      instagram: '',
      twitter: '',
      facebook: '',
      about_me: '',
    });
  }

  modifyUser(): void {

    if (this.formulario.valid) {
      const user: User = {
        username: this.formulario.value.username,        
        first_name: this.formulario.value.first_name,
        last_name: this.formulario.value.last_name,
        email: this.formulario.value.email,
        instagram_user: this.formulario.value.instagram,
        twitter_user: this.formulario.value.twitter,
        facebook_user: this.formulario.value.facebook,
        about_me: this.formulario.value.about_me,                
      };
      this._usersservice.updateUser(this.userid, user).subscribe(data => {
          console.log(data);
          if (data.id) {
            this.popup.showPopup('Información');
            this.popup.texto = 'Datos guardados correctamente';
            console.log('Datos guardados correctamente');
          } else {
            this.popup.showPopup('ERROR');
            this.popup.texto = 'Los datos no se han guardado';
            console.log('Los datos no se han guardado');
          }
        },
        error => {
          this.popup.showPopup('ERROR');
          this.popup.texto = error.error.email;          
      });
    }
  }

  recuperarInformacion(): void {
    this._usersservice.getUser().subscribe(data => {
      this.usuarioRecuperado = data;
      this.nombreUsuario = data[0].username;      
      this.formulario.setValue({
        username: data[0].username,        
        first_name: data[0].first_name,
        last_name: data[0].last_name || '',
        email: data[0].email || '',
        instagram: data[0].instagram_user || '',
        twitter: data[0].twitter_user || '',
        facebook: data[0].facebook_user || '',
        about_me: data[0].about_me || '',
      });
      this.getAdjuntos(); 
    });
  }

  getAdjuntos(): void {
   this._imagesService.getAvatar(this.userid).subscribe(data=>{     
        this.listadoAdjuntos = data;
      });
  }

  onRemoved(file: FileHolder): void{
    this._imagesService.eliminarAvatar(file.src).subscribe(data=>{});
  }


  eliminarCuenta(){
    let action = confirm("¿Seguro que desea eliminar su usuario? Esta acción es irreversible");
    if(action){
        this._usersservice.deleteUser().subscribe(data => {});
    }
  }

}
