import { Component, OnInit } from '@angular/core';
import { Videojuegos } from 'src/app/models/videojuegos';
import {DetalleJuegoComponent} from '../modal_juego/detalle-juego/detalle-juego.component'
import { MatDialog } from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';


declare var carrito2: Videojuegos[];

@Component({
  selector: 'app-index',
  templateUrl: './VideojuegosHome.component.html',
  styleUrls: ['./VideojuegosHome.component.css']
})
export class VideojuegosHome implements OnInit {

  static carrito:Videojuegos[] = [];
  acumulador: number=0
  tiles:Videojuegos[] = []

  constructor(
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    
  ) {}


  ngOnInit(): void {
    this.listarVideoJuegos();
    console.log(this.tiles)
    
  }

  
    



  DetalleModal(vj:Videojuegos){

    const dialogCrear = this.dialog.open(DetalleJuegoComponent, {
      
      width: '600px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vj,
        tipo :0
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {

        VideojuegosHome.carrito.push(data);
        
        //console.log(this.carrito)

      } else {}

      this.SumaTotal();
    })
  }

  SumaTotal(){
    this.acumulador=0;
    VideojuegosHome.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }

  DetalleCarritoModal(){

    if(VideojuegosHome.carrito.length>0){
      
      const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
        width: '1100px',
        height: '500px',
        autoFocus: false,
        
        data: VideojuegosHome.carrito,

      });

      dialogCrear.afterClosed().subscribe(data => {

          console.log(VideojuegosHome.carrito)
          console.log(this.acumulador)
          this.SumaTotal()
      });
      
    }else{window.alert("El carrito esta vacio");}
    
  }


  listarVideoJuegos(){
    this.VideoJuegoService.listarVideoJuegos().subscribe((data) =>{

      if(data!=undefined){
        this.tiles=data;
      }
      
    })
  }
}