import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guard } from '../login/services/guard';
import { CrudVjComponent } from './Admin/crud-vj/crud-vj.component';
import { IndexComponent } from './User/indexUser/index.component';
import { GamestoreComponent } from './gamestore.component';
import { LogueoComponent } from '../login/logueo/logueo.component';
import { CrudUsuariosComponent } from './Admin/crud-usuarios/crud-usuarios.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';

const routes: Routes = [
  
  
  {
    path: 'indexUser',
    component: IndexComponent,
    children: [
      {
        path: 'indexUser',
        //canActivate:[Guard],
        redirectTo: 'indexUser',
        
        
      },
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
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},

      

    ]
  },

  {
    path: 'gamestore',
    component: LogueoComponent,
  },
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamestoreRoutingModule { }
