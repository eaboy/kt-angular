import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usernameh:string;

  constructor(private _usersservice: UsersService) { 
    _usersservice.estaLogueado.subscribe(log =>{
        if(log){
          this.usernameh=this._usersservice.getUserName();
        }else{
          this.usernameh = null;
        }
    });
  }
  
  ngOnInit() {
    this.usernameh=this._usersservice.getUserName();
  }

}
