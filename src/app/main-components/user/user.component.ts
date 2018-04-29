import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CommunicationService]
})
export class UserComponent implements OnInit {

  formulario: FormGroup;
  constructor(private _formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.formulario = this._formBuilder.group({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      image: '',
      instagram: '',
      twitter: '',
      facebook: '',
      about_me: '',
    });
  }

  modifyUser(): void {
    console.log(this.formulario.value);
  }
}
