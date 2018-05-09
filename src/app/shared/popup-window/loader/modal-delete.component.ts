import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class ModalDeleteComponent {

  showPopup = false;

  constructor() { }

  @Input()
  texto;

  popupOpen(title) {
    this.showPopup = true;
  }

  popupClosed(event) {
    this.showPopup = false;
    location.assign('/');
  }

}
