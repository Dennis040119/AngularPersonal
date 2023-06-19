import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';

import {VideojuegosHome } from './Gamestore/User/VideoJuegosHome/VideoJuegosHome.component';
import {DetalleJuegoComponent } from './Gamestore/User/modal_juego/detalle-juego/detalle-juego.component';
import { DetalleCompraComponent } from './Gamestore/User/modal_juego/detalle-compra/detalle-compra.component';
import { FormCompraComponent } from './Gamestore/User/modal_juego/form-compra/form-compra.component';
import { ModalVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogConfirmComponent } from './axuliares/dialog-confirm/dialog-confirm.component';
import { CookieService } from 'ngx-cookie-service';
import { CrudVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';

import { Videojuegos } from './models/videojuegos';
import * as PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

//Componente error
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './login/services/GlobalError-handler';

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
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EurosPipe } from './pipes/euros.pipe';











@NgModule({
  declarations: [
    AppComponent,
    VideojuegosHome,
    DetalleJuegoComponent,
    DetalleCompraComponent,
    FormCompraComponent,
    CrudVjComponent,
    ModalVjComponent,
    DialogConfirmComponent,
    EurosPipe,
    
    
    
    

    
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
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule
    
    
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
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule

  ],
  providers: [CookieService ,  {provide:ErrorHandler,useClass:GlobalErrorHandler}],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
