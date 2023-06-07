import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'


const routes: Routes = [
  
  // {path:"index",canActivate:[Guard],component:IndexComponent},
  // {path:"CrudVj",canActivate:[Guard],component:CrudVjComponent},
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  {path:"gamestore",loadChildren:()=>import('./Gamestore/gamestore.module').then((m)=>m.GamestoreModule),redirectTo:""},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
