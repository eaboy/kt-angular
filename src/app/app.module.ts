import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CommunicationService } from '@services/communication/communication.service';
import { LoginService } from '@services/login/login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthService } from '@services/auth/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { ArticlesListComponent } from '@components//articles-list/articles-list.component';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';


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
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    LoginService,
    CookieService,
    CommunicationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
