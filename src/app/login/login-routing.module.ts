import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {logincomponent} from './login.component';
import {LogueoComponent} from './logueo/logueo.component';
import { Guard } from './services/guard';
import { IndexComponent } from '../Gamestore/index/index.component';
import { CrudVjComponent } from '../Gamestore/crud-vj/crud-vj.component';



const routes: Routes = [
    {
      path: '',
      component: LogueoComponent,
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
       
        {path: '', redirectTo: 'log/login', pathMatch: 'full'},
        {path: '**', redirectTo: 'log/login', pathMatch: 'full'},
      ]
    },
    {path:"gamestore",canActivate:[Guard],component:IndexComponent , data: {
      requiredRoles: ["Role1", "Role2", "Role3"]
  }},
    {path:"CrudVj",canActivate:[Guard],component:CrudVjComponent},
  ];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
  })
  export class LoginRoutingModule {}