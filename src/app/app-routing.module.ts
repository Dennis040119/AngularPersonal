import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { IndexComponent } from './Gamestore/index/index.component';
import { CrudVjComponent } from './Gamestore/crud-vj/crud-vj.component';
import { LoginModule } from './login/login.module';
import { LogueoComponent } from './login/logueo/logueo.component';
import { Guard } from './login/services/guard';

const routes: Routes = [
  
  {path:"gamestore",canActivate:[Guard],component:IndexComponent},
  {path:"CrudVj",canActivate:[Guard],component:CrudVjComponent},
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
