import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from "./login.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AppRoutingModule } from "./app-routing/app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [
    LoginService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
