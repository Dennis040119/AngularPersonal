import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamestoreRoutingModule } from './gamestore-routing.module';
import { GamestoreComponent } from '../Gamestore/gamestore.component';
import { CrudUsuariosComponent } from './Admin/crud-usuarios/crud-usuarios.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { autoTable } from 'jspdf-autotable'; 



//Material

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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { ModalUserComponent } from './Admin/crud-usuarios/modal-user/modal-user.component';
import { IndexUserComponent } from './User/index-user/index-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';

//Material Ui




@NgModule({
  declarations: [
    GamestoreComponent,
    CrudUsuariosComponent,
    IndexAdminComponent,
    ModalUserComponent,
    IndexUserComponent,
  ],
  imports: [
    CommonModule,
    GamestoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //PDF
    
    
    

    //Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule

    
    


  ]
})
export class GamestoreModule {
  
}
