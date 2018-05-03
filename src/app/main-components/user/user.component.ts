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
export class UserComponent implements OnInit, OnChanges {

  formulario: FormGroup;
  userid: number;
  listadoAdjuntos: string[];
  mensajeExito: boolean=false;

  constructor(private _formBuilder: FormBuilder,
    private _usersservice: UsersService,
    private _imagesService: ImageService) {
    this.createForm();
  }

  ngOnInit() {
    this.userid = this._usersservice.getUserId();
    this.addInformation();
  }

  ngOnChanges(){
      this.mensajeExito = false;
      this.createForm();
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

  addInformation(): void {
    this._usersservice.getUser().subscribe(data => {
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
    });
  }
}
