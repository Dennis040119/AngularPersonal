import { Component, OnInit, VERSION } from '@angular/core';
import { Videojuegos } from 'src/app/models/videojuegos';
import {DetalleJuegoComponent} from 'src/app/Gamestore/modal_juego/detalle-juego/detalle-juego.component'
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoJuegoServiceService } from 'src/app/services/video-juego-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

declare var carrito2: Videojuegos[];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  static carrito:Videojuegos[] = [];
  acumulador: number=0
  tiles:Videojuegos[] = []

  constructor(
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private UsuarioService:UsuarioService
  ) {}


  ngOnInit(): void {
    this.listarVideoJuegos();
    this.UsuarioService.listarUsuarios().subscribe((data =>
      {
        data.forEach(Usuario => {
          console.log(Usuario);
          

          
        });
      }))
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

        IndexComponent.carrito.push(data);
        
        //console.log(this.carrito)

      } else {}

      this.SumaTotal();
    })
  }

  SumaTotal(){
    this.acumulador=0;
    IndexComponent.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }

  DetalleCarritoModal(){

    if(IndexComponent.carrito.length>0){
      
      const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
        width: '1100px',
        height: '500px',
        autoFocus: false,
        
        data: IndexComponent.carrito,

      });

      dialogCrear.afterClosed().subscribe(data => {

          console.log(IndexComponent.carrito)
          console.log(this.acumulador)
          this.SumaTotal()
      });
      
    }else{window.alert("El carrito esta vacio");}
    
  }


  listarVideoJuegos(){
    this.VideoJuegoService.listarVideoJuegos().subscribe((data) =>{

      this.tiles=data;
    })
  }
}
