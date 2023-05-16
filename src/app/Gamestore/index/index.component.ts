import { Component, VERSION } from '@angular/core';
import { Videojuegos } from 'src/app/models/videojuegos';
import {AgregarJuegoComponent} from 'src/app/Gamestore/modal_juego/agregar-juego/agregar-juego.component'
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  carrito:Videojuegos[] = [];
  acumulador: number=0

  constructor(
    private dialog: MatDialog
  ) {}

  tiles:Videojuegos[] = [
    {id:1,nombre: 'BattleField 3',descripcion:"guerra",plataformas:"xbox", color: '#E36464',precio:20.99,img:'../../assets/battlefield3.jpg'},
    {id:2,nombre:'Destiny',descripcion:"fantasia",plataformas:"play 4",  color: 'lightgreen',precio:10.99,img:'../../assets/Destiny.jpg'},
    {id:3,nombre: 'Gears of war 2',descripcion:"shooter",plataformas:"xbox one", color: '#CB6A26',precio:35.99,img:'../../assets/GearsOfWar2.jpg'},
    {id:4,nombre: 'HomeFront',descripcion:"RPG",plataformas:"PC", color: '#909090',precio:40.99,img:'../../assets/HomeFront.jpg'},
    {id:5,nombre: 'Mario Galaxy',descripcion:"plataforma",plataformas:"Nintendo", color: '#4751CA',precio:30.99,img:'../../assets/Mario Galaxy.jpg'},
    {id:6,nombre: 'six',descripcion:"guerra",plataformas:"xbox", color: '#DDBDF1',precio:10.99,img:'../../assets/battlefield3.jpg'},
  ];



  DetalleModal(vj:Videojuegos){

    const dialogCrear = this.dialog.open(AgregarJuegoComponent, {
      
      width: '410px',
      height: '550px',
      autoFocus: false,
      disableClose: true,
      data: {
        objeto:vj,
        tipo :0
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {

        this.carrito.push(data);
        this.SumaTotal();
        //console.log(this.carrito)

      } else {
       
      }
    })
  }

  SumaTotal(){
    

    this.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }

  DetalleCarritoModal(){

    if(this.carrito.length>0){
      const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
        width: '1100px',
        height: '500px',
        autoFocus: false,
        disableClose: true,
        data: this.carrito,

      });
    }else{
      window.alert("El carrito esta vacio");
    }
    
  }


}
