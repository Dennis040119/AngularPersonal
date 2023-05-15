import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {AlumnoComponent } from './alumno/alumno.component';
import {TablaComponent } from './Tabla_Quimica/tabla/tabla.component';
import {IndexComponent } from './Gamestore/index/index.component';
import {AgregarJuegoComponent } from './Gamestore/modal_juego/agregar-juego/agregar-juego.component';


//Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {AgregarComponent } from './Tabla_Quimica/agregar/agregar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';







@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    TablaComponent,
    AgregarComponent,
    IndexComponent,
    AgregarJuegoComponent
    

    
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
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule
    
    
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
