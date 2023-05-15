import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Videojuegos } from 'src/app/models/videojuegos';

@Component({
  selector: 'app-agregar-juego',
  templateUrl: './agregar-juego.component.html',
  styleUrls: ['./agregar-juego.component.css']
})
export class AgregarJuegoComponent implements OnInit {

  x:Videojuegos=new Videojuegos();

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AgregarJuegoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    
  
  ){}

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.x ={...this.data['objeto']};
    //this.tipo = this.data['tipo'];
    //console.log(this.x);

  }

  cargar(){
    //console.log(this.x);
    this.dialogRef.close(this.x)
  }

  quitar(){

  }
  cerrar(){
    this.dialogRef.close();
  }

}
