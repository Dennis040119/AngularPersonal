import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { LogueoComponent } from './login/logueo/logueo.component';
import { RegistroComponent } from './login/registro/registro.component';
import { IndexAdminComponent } from './Gamestore/Admin/index-admin/index-admin.component';
import { IndexUserComponent } from './Gamestore/User/index-user/index-user.component';
import { VideojuegosHome } from './Gamestore/User/VideoJuegosHome/VideoJuegosHome.component';
import { UserConfigComponent } from './Gamestore/User/user-config/user-config.component';
import { VideoConsolasHomeComponent } from './Gamestore/User/video-consolas-home/video-consolas-home.component';
import { CrudUsuariosComponent } from './Gamestore/Admin/crud-usuarios/crud-usuarios.component';
import { CrudVcComponent } from './Gamestore/Admin/crud-vc/crud-vc.component';
import { CrudVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';
import { GuardAdmin } from './services/utils/guardAdmin';
import { NosotrosComponent } from './Gamestore/User/nosotros/nosotros.component';
import { ComprasPersonalComponent } from './Gamestore/User/compras-personal/compras-personal.component';
import { guardUserGuard } from './services/utils/guard-user.guard';



const routes: Routes = [
  
 
  {path:'login',component:LogueoComponent},
  {path:'registro',component:RegistroComponent},
  {path:'',redirectTo:'login',pathMatch: 'full'},
  //Rutas indexUser
  {
    path: 'indexUser',
    
    component: IndexUserComponent,
    canActivate:[guardUserGuard],
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
      {path: 'nosotros', component:NosotrosComponent},
      {path: 'compras', component:ComprasPersonalComponent},
      
      
     
     
      
      
    ]
  },
  //Rutas indexAdmin
  {
    path: 'indexAdmin',
    component: IndexAdminComponent,
    canActivate:[GuardAdmin],
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
  
 
  {path: 'error', component: LogueoComponent },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
