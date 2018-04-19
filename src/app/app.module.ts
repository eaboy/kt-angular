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
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesListComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CookieService,
    CommunicationService,
    AuthService,
    UsersService,
    ArticlesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
