import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { number, string, any } from 'prop-types';
import { EnumService } from 'src/app/Gamestore/Admin/services/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleJuegoComponent } from '../detalle-juego/detalle-juego.component';

@Component({
  selector: 'app-detalle-videconsola',
  templateUrl: './detalle-videconsola.component.html',
  styleUrls: ['./detalle-videconsola.component.css']
})
export class DetalleVideconsolaComponent implements OnInit {

  x:VideoConsola
  tipo:number=0

  plataformas?:string=""
  genero?:string=""

  //Enums
  GeneroList:Genero []
  PlataformList:Plataforma[]

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleVideconsolaComponent>,
    private EnumService:EnumService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    
  
  ){}

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.x ={...this.data['objeto']};
    this.tipo = this.data['tipo'];
    console.log(this.x);
    
   

  }

  cargar(){
    //console.log(this.x);
    this.dialogRef.close(this.x)
  }

  quitar(v:VideoConsola){

    
    var supo:Videojuegos[] = VideojuegosHome.carrito;
    //console.log(v==supo? "SOn iguales":"son diferentes")
    console.log(v)
    console.log(supo[0])

   
    //  var  conta =VideojuegosHome.carrito.findIndex(obj =>obj.id==v.id);
    //  if(conta  >-1){
    //    console.log(conta)
    //    VideojuegosHome.carrito.splice(conta,1)
    //    this.dialogRef.close();
    
    //  }else{
    //    console.log("No se encuentra en el carrito")
    //  }
    
    
    
  }
  cerrar(){
    
    this.dialogRef.close();
  }



  

}