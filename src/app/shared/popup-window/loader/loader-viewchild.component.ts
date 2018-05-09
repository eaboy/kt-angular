import {Component, Input, ViewChild} from '@angular/core';
import {PopupWindowComponent} from "../popup-window.component";

@Component({
  selector: 'app-loader-vc',
  templateUrl: './loader-viewchild.component.html'
})
export class LoaderViewChildComponent {

  @ViewChild(PopupWindowComponent)
  popup : PopupWindowComponent;
  
  @Input()
  texto;

  showPopup(title) {
    this.popup.isOpen = true;
    this.popup.title = title;
  }

  popupClosed(event) {}
}
