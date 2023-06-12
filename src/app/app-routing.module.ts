import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { LoginModule } from './login/login.module';
import { logincomponent } from './login/login.component';


const routes: Routes = [
  
 
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  {path: 'error-page', component: logincomponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
