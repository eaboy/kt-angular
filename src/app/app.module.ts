import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing/app-routing.module";

import { CommunicationService } from '@services/communication/communication.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
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
import { UserComponent } from './main-components/user/user.component';

import { AlertComponent } from './shared/directives/index';
import { AlertService } from '@services/alerts/index';
import { FileInputAccessorModule } from "file-input-accessor";
import { LogoutComponent } from "@components/logout/logout.component";



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
    LogoutComponent
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
    FileInputAccessorModule
  ],
  providers: [
    CookieService,
    CommunicationService,
    AuthService,
    UsersService,
    ArticlesService,
    AlertService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
