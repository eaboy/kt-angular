import { Component, OnInit, OnChanges } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '@services/users/users.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../interfaces/users';
import { ImageService } from "@components/images-uploader/image.service";
import { FileHolder } from "@components/images-uploader/image-upload.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CommunicationService]
})
export class UserComponent implements OnInit {

  formulario: FormGroup;
  userid: number;
  listadoAdjuntos: string[];
  mensajeExito: boolean=false;
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
    console.log(this.formulario.value);
  }

  recuperarInformacion(): void {
    this._usersservice.getUser().subscribe(data => {
      this.usuarioRecuperado = data;
      this.formulario.setValue({
        username: data[0].username,
        first_name: data[0].first_name,
        last_name: data[0].last_name || '',
        email: data[0].email || '',
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
