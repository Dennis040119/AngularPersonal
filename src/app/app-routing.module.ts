import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { IndexComponent } from './Gamestore/User/indexUser/index.component';
import { CrudVjComponent } from './Gamestore/Admin/crud-vj/crud-vj.component';
import { LoginModule } from './login/login.module';
import { LogueoComponent } from './login/logueo/logueo.component';
import { Guard } from './login/services/guard';

const routes: Routes = [
  
  // {path:"index",canActivate:[Guard],component:IndexComponent},
  // {path:"CrudVj",canActivate:[Guard],component:CrudVjComponent},
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  {
    path: '**', redirectTo: "" 
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
