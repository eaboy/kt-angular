import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '@services/users/users.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CommunicationService]
})
export class UserComponent implements OnInit {

  formulario: FormGroup;
  userid: number;


  constructor(private _formBuilder: FormBuilder,
    private _usersservice: UsersService) {
    this.createForm();
  }

  ngOnInit() {
    this.userid = this._usersservice.getUserId();
    this.addInformation();
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

  addInformation(): void {
    this._usersservice.getUser().subscribe(data => {
      this.formulario.setValue({
        username: data[0].username,
        first_name: 'Luis',
        last_name: 'Barriga',
        email: 'barbaclu@gmail.com',
        image: 'luis',
        instagram: 'luis',
        twitter: 'luis',
        facebook: 'luis',
        about_me: 'luis',
      });
    });
  }
}
