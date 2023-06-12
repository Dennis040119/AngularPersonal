import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { EnumService } from 'src/app/Gamestore/Admin/services/enum.service';
import { Genero } from 'src/app/models/genero';
import { Plataforma } from 'src/app/models/plataforma';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent implements OnInit {

  x:Videojuegos=new Videojuegos();
  tipo:number=0

  plataformas?:string=""
  genero?:string=""

  //Enums
  GeneroList:Genero []
  PlataformList:Plataforma[]

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleJuegoComponent>,
    private EnumService:EnumService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    
  
  ){}

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.x ={...this.data['objeto']};
    this.tipo = this.data['tipo'];
    console.log(this.x);
    this.setearEnum();
   

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

  setearEnum(){
    this.EnumService.listarGenero().subscribe((data)=>{
      this.GeneroList=data
      this.genero=(this.GeneroList.find(gen => gen.id==this.x.genero.id))?.nombre
    })
    //pf001,pf002
    this.EnumService.listarPlataformas().subscribe((data)=>{

      var pla1:string|undefined
      var pla2:string|undefined
      var pla3:string|undefined
      this.PlataformList=data
      pla1=(this.PlataformList.find(pla => pla.id==this.x.plataformas.slice(0,5) ))?.nombre
      pla2=(this.PlataformList.find(pla => pla.id==this.x.plataformas.slice(6,11)))?.nombre
      pla3=(this.PlataformList.find(pla => pla.id==this.x.plataformas.slice(12,17)))?.nombre
      this.plataformas=pla1
      
      if(pla2!=(undefined) && pla2!=""){this.plataformas=pla1+","+pla2}
      if(pla3!=(undefined) && pla3!=""){this.plataformas=pla1+","+pla2+","+pla3}
    })

  }

}
