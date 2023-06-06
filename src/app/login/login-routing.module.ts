import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {logincomponent} from './login.component';
import {LogueoComponent} from './logueo/logueo.component';
import { Guard } from './services/guard';
import { VideojuegosHome } from '../Gamestore/User/VideoJuegosHome/VideoJuegosHome.component';
import { CrudVjComponent } from '../Gamestore/Admin/crud-vj/crud-vj.component';



const routes: Routes = [
    {
      path: '',
      component: LogueoComponent,
      children: [
        {
          path: 'login',
          redirectTo: 'login',
          pathMatch: 'full'
        },
       
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: '**', redirectTo: 'login', pathMatch: 'full'},
      ]
    },
    
    {path:"gamestore",
    canActivate:[Guard],
    loadChildren:()=>import('../Gamestore/gamestore.module').then((m)=>m.GamestoreModule)
    
    },
    
  ];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
  })
  export class LoginRoutingModule {}