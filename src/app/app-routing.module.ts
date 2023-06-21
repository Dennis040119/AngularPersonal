import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/compiler'
import { LoginModule } from './login/login.module';
import { logincomponent } from './login/login.component';
import { LogueoComponent } from './login/logueo/logueo.component';
import { notFoundGuard } from './login/services/not-found.guard';


const routes: Routes = [
  
 
  {path:"",loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)},
  
  {path: 'error', component: LogueoComponent },
  //{path:"**",canActivate: [notFoundGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
