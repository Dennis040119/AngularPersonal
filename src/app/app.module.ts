import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {VideojuegosHome } from './Gamestore/User/VideoJuegosHome/VideoJuegosHome.component';
import {DetalleJuegoComponent } from './Gamestore/User/VideoJuegosHome/Card-Videojuego/detalle-juego.component';
import { DetalleCompraComponent } from './Gamestore/User/modal_juego/detalle-compra/detalle-compra.component';
import { FormCompraComponent } from './Gamestore/User/modal_juego/form-compra/form-compra.component';
import { ModalVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogConfirmComponent } from './axuliares/dialog-confirm/dialog-confirm.component';
import { CookieService } from 'ngx-cookie-service';
import { CrudVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IndexUserComponent } from './Gamestore/User/index-user/index-user.component';
//Pipe
import { EurosPipe } from './pipes/euros.pipe';

//Libreria de pdf y excel
import * as PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

//Componente error
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './services/utils/GlobalError-handler';

//Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';


//Bootsstrap

import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { PlataformPipePipe } from './pipes/plataform-pipe.pipe';
import { DetalleVideconsolaComponent } from './Gamestore/User/video-consolas-home/detalle-videconsola/detalle-videconsola.component';













@NgModule({
  declarations: [
    AppComponent,
    VideojuegosHome,
    DetalleJuegoComponent,
    DetalleCompraComponent,
    IndexUserComponent,
    FormCompraComponent,
    CrudVjComponent,
    ModalVjComponent,
    DialogConfirmComponent,
    EurosPipe,
    IndexUserComponent,
    PlataformPipePipe,
    DetalleVideconsolaComponent,
    
    
    
    
    

    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    //Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,


    //Bootstrap
    
    NgbCarouselModule,
    
    
    
  ],
  exports: [
    IndexUserComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatSnackBarModule,

    //Bootstrap
    NgbCarouselModule

  ],
  providers: [CookieService ,  {provide:ErrorHandler,useClass:GlobalErrorHandler}],
  bootstrap: [AppComponent]
}
)

export class AppModule { }
