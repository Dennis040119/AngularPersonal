import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  nombre?:string;
  peso?:number;
  simbolo?:string;
  

  constructor(
    private dialogRef: MatDialogRef<AgregarComponent>,
    


  ) { }

  cerrar() {
    this.dialogRef.close();
  }

  agregar(){

    if(this.nombre!=undefined && this.peso!=undefined && this.simbolo!=undefined)
    {

      var a= { position: 10, name: this.nombre, weight: this.peso, symbol: this.simbolo};
      this.dialogRef.close(a);

    
    }else{
      window.alert("Faltan datos")
    }
    
  }

}
