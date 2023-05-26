import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
//import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {LogueoComponent } from './logueo/logueo.component';

import { HttpClientModule } from '@angular/common/http';
import { logincomponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LogueoComponent,
    logincomponent,
    
    

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [LoginModule]
})
export class LoginModule { }
