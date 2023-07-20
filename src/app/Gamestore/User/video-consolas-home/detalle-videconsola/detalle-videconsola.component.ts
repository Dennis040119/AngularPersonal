import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { number, string, any } from 'prop-types';
import { EnumService } from 'src/app/services/mtnm/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleJuegoComponent } from '../../VideoJuegosHome/Card-Videojuego/detalle-juego.component';
import { ProductosVenta } from 'src/app/models/cliente/productos-venta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/medias/storage.service';

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

  dirImgVj:string="imgVideoConsolas"
  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleVideconsolaComponent>,
    private EnumService:EnumService,
    private imgService:StorageService,
    private snackBar:MatSnackBar,
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
    var supo:ProductosVenta[] = VideojuegosHome.carrito;
    console.log(v)
    console.log(supo[0])
  }
  cerrar(){this.dialogRef.close();}


  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
  

}