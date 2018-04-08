import { Component } from '@angular/core';
import { CommunicationService } from './shared/services/communication/communication.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private comService: CommunicationService) {
    this.comService.getData(`${environment.backEndUrl}/articles/all/`).subscribe( value => {
      console.log(value);
    });
  }
}
