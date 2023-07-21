import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Guard } from './../services/utils/guard';
import { CrudVjComponent } from './Admin/crud-vj/crud-vj.component';
import { VideojuegosHome } from './User/VideoJuegosHome/VideoJuegosHome.component';
import { GamestoreComponent } from './gamestore.component';
import { LogueoComponent } from '../login/logueo/logueo.component';
import { CrudUsuariosComponent } from './Admin/crud-usuarios/crud-usuarios.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { IndexUserComponent } from './User/index-user/index-user.component';
import { GlobalErrorHandler } from './../services/utils/GlobalError-handler';
import { logincomponent } from '../login/login.component';
import { CrudVcComponent } from './Admin/crud-vc/crud-vc.component';
import { VideoConsolasHomeComponent } from './User/video-consolas-home/video-consolas-home.component';
import { UserConfigComponent } from './User/user-config/user-config.component';

const routes: Routes = [
  
  
  {
    path: 'indexUser',
    
    component: IndexUserComponent,
   
    children: [
      {
        path: 'homeVideojuegos/:plataforma',
        component:VideojuegosHome,
      },
      {
        path: 'homeVideojuegos',
        component:VideojuegosHome,
        children:[
          {path:'', redirectTo: 'homeVideojuegos', pathMatch: 'full'},
        ]
      },
      {
        path: 'homeVideoConsolas',
        component:VideoConsolasHomeComponent,
        //canActivate:[Guard],
      },
      {
        path: 'homeVideoConsolas/:marca',
        component:VideoConsolasHomeComponent,
        //canActivate:[Guard],
      },

      {path: 'UserConfig', component:UserConfigComponent},
      
      
     
     
      
      
    ]
  },

  {
    path: 'indexAdmin',
    component: IndexAdminComponent,
    children: [
      {
        path: 'CrudVj',
        //canActivate:[Guard],
        component:CrudVjComponent,
        children:[
          {path:'', redirectTo: 'CrudVj', pathMatch: 'full'},
        ]
      },
      {
        path:'CrudUsuario',
        //canActivate:[Guard],
        component:CrudUsuariosComponent,
        children:[
          {path:'', redirectTo: 'CrudUsuario', pathMatch: 'full'},
        ]
      },
      {
        path: 'CrudVc',
        //canActivate:[Guard],
        component:CrudVcComponent,
        children:[
          {path:'', redirectTo: 'CrudVc', pathMatch: 'full'},
        ]
      },

     



      {path: '', redirectTo: 'error', pathMatch: 'full'},
      {path: '**', redirectTo: 'error', pathMatch: 'full'},

    ]
  },
  {
    path: '',
    
    //redirectTo:Guard.roles=="user" ?"indexUser":"indexAdmin",
    redirectTo:Guard.roles=="admin" ?"indexAdmin":"indexUser",
    
    pathMatch:'full'
    
  },
  {path: 'error', component: LogueoComponent },
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamestoreRoutingModule { }
