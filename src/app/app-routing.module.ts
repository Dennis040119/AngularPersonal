import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { LoginModule } from './login/login.module';
import { logincomponent } from './login/login.component';


const routes: Routes = [
  
  // {path:"index",canActivate:[Guard],component:IndexComponent},
  // {path:"CrudVj",canActivate:[Guard],component:CrudVjComponent},
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  {path:"gamestore",loadChildren:()=>import('./Gamestore/gamestore.module').then((m)=>m.GamestoreModule),redirectTo:""},
  { path: 'error-page', component: logincomponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
