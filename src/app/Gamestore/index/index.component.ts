import { Component, VERSION } from '@angular/core';
import { Videojuegos } from 'src/app/models/videojuegos';
import {AgregarJuegoComponent} from 'src/app/Gamestore/modal_juego/agregar-juego/agregar-juego.component'
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  carrito:Videojuegos[] = [];

  constructor(
    private dialog: MatDialog
  ) {}

  tiles:Videojuegos[] = [
    {id:1,nombre: 'BattleField 3',descripcion:"guerra",plataformas:"xbox", color: '#E36464',precio:20.99,img:'../../assets/battlefield3.jpg'},
    {id:2,nombre:'Destiny',descripcion:"fantasia",plataformas:"play 4",  color: 'lightgreen',precio:20.99,img:'../../assets/Destiny.jpg'},
    {id:3,nombre: 'Gears of war 2',descripcion:"shooter",plataformas:"xbox one", color: '#CB6A26',precio:20.99,img:'../../assets/GearsOfWar2.jpg'},
    {id:4,nombre: 'HomeFront',descripcion:"RPG",plataformas:"PC", color: '#909090',precio:20.99,img:'../../assets/HomeFront.jpg'},
    {id:5,nombre: 'Mario Galaxy',descripcion:"plataforma",plataformas:"Nintendo", color: '#4751CA',precio:20.99,img:'../../assets/Mario Galaxy.jpg'},
    {id:6,nombre: 'six',descripcion:"guerra",plataformas:"xbox", color: '#DDBDF1',precio:20.99,img:'../../assets/battlefield3.jpg'},
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
        console.log(this.carrito)

      } else {
       
      }
    })
  }




}
