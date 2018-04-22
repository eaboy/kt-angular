import { Component } from '@angular/core';
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

<<<<<<< HEAD
  constructor() { 
    
=======
  constructor(private comService: CommunicationService) {
    this.comService.getData(`${environment.apiUrl}/articles/all/`).subscribe( value => {
      //console.log(value);
    });
>>>>>>> jlpilo003
  }
}
