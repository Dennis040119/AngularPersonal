import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';

import {IndexComponent } from './Gamestore/index/index.component';
import {DetalleJuegoComponent } from './Gamestore/modal_juego/detalle-juego/detalle-juego.component';
import { FormCompraComponent } from './Gamestore/modal_juego/form-compra/form-compra.component';
import { DetalleCompraComponent } from './Gamestore/modal_juego/detalle-compra/detalle-compra.component';
import { ModalVjComponent } from './Gamestore/crud-vj/modal-vj/modal-vj.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



//Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CrudVjComponent } from './Gamestore/crud-vj/crud-vj.component';
import {MatSelectModule} from '@angular/material/select';
import { DialogConfirmComponent } from './axuliares/dialog-confirm/dialog-confirm.component';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';









@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetalleJuegoComponent,
    DetalleCompraComponent,
    FormCompraComponent,
    CrudVjComponent,
    ModalVjComponent,
    DialogConfirmComponent,
    
    

    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
    MatNativeDateModule,
    MatSelectModule
    
    
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
    MatNativeDateModule,
    MatSelectModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
