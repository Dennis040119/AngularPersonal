import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {AlumnoComponent } from './alumno/alumno.component';
import {TablaComponent } from './Tabla_Quimica/tabla/tabla.component';
import {IndexComponent } from './Gamestore/index/index.component';
import {AgregarJuegoComponent } from './Gamestore/modal_juego/detalle-juego/detalle-juego.component';
import { FormCompraComponent } from './Gamestore/modal_juego/form-compra/form-compra.component';
import { DetalleCompraComponent } from './Gamestore/modal_juego/detalle-compra/detalle-compra.component';


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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';








@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    TablaComponent,
    AgregarComponent,
    IndexComponent,
    AgregarJuegoComponent,
    DetalleCompraComponent,
    FormCompraComponent
    

    
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
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
