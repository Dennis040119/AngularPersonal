import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent implements OnInit {

  x:Videojuegos=new Videojuegos();
  tipo:number=0

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleJuegoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    
  
  ){}

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.x ={...this.data['objeto']};
    this.tipo = this.data['tipo'];
    //console.log(this.x);

  }

  cargar(){
    //console.log(this.x);
    this.dialogRef.close(this.x)
  }

  quitar(v:Videojuegos){

    
    var supo:Videojuegos[] = VideojuegosHome.carrito;
    //console.log(v==supo? "SOn iguales":"son diferentes")
    console.log(v)
    console.log(supo[0])

   
     var  conta =VideojuegosHome.carrito.findIndex(obj =>obj.id==v.id);
     if(conta  >-1){
       console.log(conta)
       VideojuegosHome.carrito.splice(conta,1)
       this.dialogRef.close();
    
     }else{
       console.log("No se encuentra en el carrito")
     }
    
    
    
  }
  cerrar(){
    this.dialogRef.close();
  }

}
