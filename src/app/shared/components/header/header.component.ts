import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _usersservice: UsersService) { }
  
  usernameh:string;

  ngOnInit() {
    this.usernameh=this._usersservice.getUserName();
  }

}
