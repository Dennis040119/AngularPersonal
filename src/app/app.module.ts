import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {AlumnoComponent } from './alumno/alumno.component';
import {TablaComponent } from './tabla/tabla.component';

//Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
    
    
    
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
