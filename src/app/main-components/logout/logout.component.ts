import { Component, OnInit } from '@angular/core';
import { UsersService } from "@services/users/users.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _userService: UsersService) { }

  ngOnInit() {
    this._userService.logoutUser().subscribe((data)=>{
      console.log(data);
    });
  }

}
