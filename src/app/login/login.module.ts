import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
//import {BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogueoComponent } from './logueo/logueo.component';

import { HttpClientModule } from '@angular/common/http';
import { logincomponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

/////
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    LogueoComponent,
    logincomponent,
    RegistroComponent,
    
    

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
      
    //Material
      MatFormFieldModule,
      MatButtonModule,
      MatInputModule,
      
      ReactiveFormsModule,
      MatTableModule,
      MatDialogModule,
      MatIconModule,
      MatGridListModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule
    
  ],
  
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [LoginModule]
})
export class LoginModule { }
