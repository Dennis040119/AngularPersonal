import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { VideojuegosHome } from '../VideoJuegosHome.component';
import { EnumService } from 'src/app/services/mtnm/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { ProductosVenta } from 'src/app/models/cliente/productos-venta';
import { VideoJuegoServiceService } from 'src/app/services/mtnm/video-juego-service.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/medias/storage.service';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent implements OnInit {

  x:Videojuegos
  tipo:number=0

  plataformas?:string=""
  genero?:string=""

  //Enums
  GeneroList:Genero []
  PlataformList:Plataforma[]


  dirImgVj:string="imgVideoJuegos"

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleJuegoComponent>,
    private EnumService:EnumService,
    private vjService:VideoJuegoServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private injector: Injector,
    private imgService:StorageService
    
  
  ){}

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.x =this.data['objeto'];
    this.tipo = this.data['tipo'];
    console.log(this.x);
    this.setearGen();
    
   

  }

  cargar(){
    //console.log(this.x);
    this.dialogRef.close(this.x)
  }

  quitar(v:Videojuegos){

    //console.log(v==supo? "SOn iguales":"son diferentes")
    

   
     var  conta =VideojuegosHome.carrito.findIndex(obj =>obj.productosVentaPk.proId==v.id);
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

  setearGen(){

    this.vjService.buscarVideoJuegos(this.x.id).subscribe({

      next:(data1)=>{
        var x:Videojuegos=data1[0]
        //Setear generos
        this.EnumService.listarGenero().subscribe({

          next:(result) =>{
            this.GeneroList=result
            
            
          },
          error:(error)=>{
           
          },
          complete: ()=>{
            console.log(this.x.genero)
            this.genero=(this.GeneroList.find(gen => gen.genId==this.x.genero.genId))?.nombre
          }

        })

        /////Setear plataformas
        this.EnumService.listarPlataformas().subscribe((data)=>{

          var pla1:string|undefined
          var pla2:string|undefined
          var pla3:string|undefined
          this.PlataformList=data
          pla1=(this.PlataformList.find(pla => pla.platId==this.x.plataformas.slice(0,5) ))?.nombre
          pla2=(this.PlataformList.find(pla => pla.platId==this.x.plataformas.slice(6,11)))?.nombre
          pla3=(this.PlataformList.find(pla => pla.platId==this.x.plataformas.slice(12,17)))?.nombre
          this.plataformas=pla1
          
          if(pla2!=(undefined) && pla2!=""){this.plataformas=pla1+","+pla2}
          if(pla3!=(undefined) && pla3!=""){this.plataformas=pla1+","+pla2+","+pla3}
        })

        ///////////////
      },

      error:(error)=>{
        window.alert(error)
        const router = this.injector.get(Router)
        router.navigate(['']);
      },
      complete: ()=>{

        
      }
    })

  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }

}
