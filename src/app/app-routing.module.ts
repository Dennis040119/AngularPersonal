import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { TablaComponent } from './Tabla_Quimica/tabla/tabla.component';
import { IndexComponent } from './Gamestore/index/index.component';

const routes: Routes = [
  {path:"alumno", component:AlumnoComponent },
  {path:"tablas", component:TablaComponent},
  {path:"gamestore",component:IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
