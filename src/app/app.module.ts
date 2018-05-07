import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing/app-routing.module";

import { CommunicationService } from '@services/communication/communication.service';
import { CookieModule } from 'ngx-cookie';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users/users.service';
import { ArticlesService } from '@services/articles/articles.service';

import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { ArticlesListComponent } from '@components//articles-list/articles-list.component';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ArticleComponent } from './main-components/article/article.component';
import { QuillModule } from 'ngx-quill';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './main-components/user/user.component';

import { AlertComponent } from './shared/directives/index';
import { AlertService } from '@services/alerts/index';
import { FileInputAccessorModule } from "file-input-accessor";
import { LogoutComponent } from "@components/logout/logout.component";
import { ResetPasswordComponent } from "@components/reset-password/reset-password.component";
import { ImageUploadComponent } from "@components/images-uploader/image-upload.component";
import { ImageService } from "@components/images-uploader/image.service";
import { FileDropDirective } from "@components/images-uploader/file-drop.directive";
import { FieldErrorDisplayComponent } from '@components/field-error-display/field-error-display.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { PopupWindowComponent } from './shared/popup-window/popup-window.component';
import { ModalDeleteComponent } from './shared/popup-window/loader/modal-delete.component';
import { LoaderViewChildComponent } from "./shared/popup-window/loader/loader-viewchild.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesListComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    UserComponent,
    AlertComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ImageUploadComponent,
    FileDropDirective,
    FieldErrorDisplayComponent,
    PopupWindowComponent,
    ModalDeleteComponent,
    LoaderViewChildComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    BsDatepickerModule.forRoot(),
    FileInputAccessorModule,
    NgbModule.forRoot(),
    CookieModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
    
  ],
  providers: [
    CommunicationService,
    AuthService,
    UsersService,
    ArticlesService,
    AlertService,
    ImageService,
    LoaderViewChildComponent,
    PopupWindowComponent
  ],
  bootstrap: [AppComponent],
})


export class AppModule { }
