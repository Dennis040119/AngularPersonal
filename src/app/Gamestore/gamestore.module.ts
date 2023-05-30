import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamestoreRoutingModule } from './gamestore-routing.module';
import { GamestoreComponent } from '../Gamestore/gamestore.component';
import { CrudUsuariosComponent } from './Admin/crud-usuarios/crud-usuarios.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';

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
import {MatMenuModule} from '@angular/material/menu';




@NgModule({
  declarations: [
    GamestoreComponent,
    CrudUsuariosComponent,
    IndexAdminComponent,
  ],
  imports: [
    CommonModule,
    GamestoreRoutingModule,

    //Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class GamestoreModule {
  
}
