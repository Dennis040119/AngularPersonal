import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/videojuegos';
import { AgregarJuegoComponent } from '../detalle-juego/detalle-juego.component';
import { FormCompraComponent } from '../form-compra/form-compra.component';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {
  
  
  carrito:Videojuegos[]=[];
  carrito2:Videojuegos[]=[];

  
  

  displayedColumns = ['Id', 'nombre', 'precio', 'portada','options'];
  dataSource = new MatTableDataSource(this.carrito);
  
  

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleCompraComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Videojuegos[],
  
  ){}

  ngOnInit(): void {
    
    this.carrito =this.data;
    //console.log(this.carrito);
    //console.log(this.carrito.length)
    this.dataSource = new MatTableDataSource(this.carrito);
    
    
    

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit() {
  }

  delete(v:Videojuegos){

    var conta:number=0
    conta =this.carrito.indexOf(v);

    this.carrito.splice(conta,1)
    console.log(this.carrito)
    
    this.dataSource.filter = ""
  }

  detalle(vj:Videojuegos){
    const dialogCrear = this.dialog.open(AgregarJuegoComponent, {
      
      width: '410px',
      height: '550px',
      autoFocus: false,
      disableClose: true,
      data: {
        objeto:vj,
        tipo :1
      }
    });
    
  }

  crearcarrito(){
    this.carrito2 = [
      {id:1,nombre: 'BattleField 3',descripcion:"guerra",plataformas:"xbox", color: '#E36464',precio:20.99,img:'../../assets/battlefield3.jpg'},
      {id:2,nombre:'Destiny',descripcion:"fantasia",plataformas:"play 4",  color: 'lightgreen',precio:10.99,img:'../../assets/Destiny.jpg'},
      {id:3,nombre: 'Gears of war 2',descripcion:"shooter",plataformas:"xbox one", color: '#CB6A26',precio:35.99,img:'../../assets/GearsOfWar2.jpg'},
      {id:4,nombre: 'HomeFront',descripcion:"RPG",plataformas:"PC", color: '#909090',precio:40.99,img:'../../assets/HomeFront.jpg'},
      {id:5,nombre: 'Mario Galaxy',descripcion:"plataforma",plataformas:"Nintendo", color: '#4751CA',precio:30.99,img:'../../assets/Mario Galaxy.jpg'},
      {id:6,nombre: 'six',descripcion:"guerra",plataformas:"xbox", color: '#DDBDF1',precio:10.99,img:'../../assets/battlefield3.jpg'},
    ];
  }

  close(){
    this.dialogRef.close();
  }

  formCompra(){

    const dialogref =this.dialog.open(FormCompraComponent,{

      width: '500px',
      height: '700px',
      autoFocus: false,
      //disableClose: true,
      data: {
        objeto:this.carrito,
        
      }
    });
  }
}
