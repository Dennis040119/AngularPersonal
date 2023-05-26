import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {logincomponent} from './login.component';
import {LogueoComponent} from './logueo/logueo.component';



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
    }
  ];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
  })
  export class LoginRoutingModule {}