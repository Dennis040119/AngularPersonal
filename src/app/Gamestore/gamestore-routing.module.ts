import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Guard } from '../login/services/guard';
import { CrudVjComponent } from './Admin/crud-vj/crud-vj.component';
import { VideojuegosHome } from './User/VideoJuegosHome/VideoJuegosHome.component';
import { GamestoreComponent } from './gamestore.component';
import { LogueoComponent } from '../login/logueo/logueo.component';
import { CrudUsuariosComponent } from './Admin/crud-usuarios/crud-usuarios.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { IndexUserComponent } from './User/index-user/index-user.component';

const routes: Routes = [
  
  
  {
    path: 'indexUser',
    component: IndexUserComponent,
    children: [
      {
        path: 'homeVideojuegos',
        component:VideojuegosHome
        //canActivate:[Guard],
      },
      {path: '', redirectTo: 'indexUser', pathMatch: 'full'},
      {path: '**', redirectTo: 'indexUser', pathMatch: 'full'}
    ]
  },

  {
    path: 'indexAdmin',
    component: IndexAdminComponent,
    children: [
      {
        path: 'CrudVj',
        component:CrudVjComponent,
      },
      {
        path:'CrudUsuario',
        component:CrudUsuariosComponent
      },
      {path: '', redirectTo: 'indexAdmin', pathMatch: 'full'},
      {path: '**', redirectTo: 'indexAdmin', pathMatch: 'full'},

    ]
  },
  
  {
    path: '',
    //redirectTo:Guard.roles=="user" ?"indexUser":"indexAdmin",
    redirectTo:Guard.roles=="admin" ?"indexAdmin":"indexUser",
    pathMatch:'full'
    
  },
  
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamestoreRoutingModule { }
