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
      password: '',
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
        password: this.formulario.value.password,
      };

      this._usersservice.updateUser(this.userid, user).subscribe(data => {
          if (data.id) {
            this.popup.showPopup('Información');
            this.popup.texto = 'Datos guardados correctamente';
            console.log('Datos guardados correctamente');
          } else {
            this.popup.showPopup('ERROR');
            this.popup.texto = 'Los datos no se han guardado';
            console.log('Los datos no se han guardado');
          }
        });
    }
  }

  recuperarInformacion(): void {
    this._usersservice.getUser().subscribe(data => {
      this.usuarioRecuperado = data;
      this.formulario.setValue({
        username: data[0].username,
        first_name: data[0].first_name,
        last_name: data[0].last_name || '',
        email: data[0].email || '',
        password: data[0].password || '',
        instagram: data[0].instagram || '',
        twitter: data[0].twitter || '',
        facebook: data[0].facebook || '',
        about_me: data[0].about_me || '',
      });
      this.getAdjuntos(); 
    });
  }

  getAdjuntos(): void {
   this._imagesService.getAdjuntos(this.userid).subscribe(data=>{
        this.listadoAdjuntos = data;
      });
  }

  onRemoved(file: FileHolder): void{
    console.log(file.src);
    this._imagesService.eliminarAdjunto(file.src).subscribe(data=>{});
  }


}
