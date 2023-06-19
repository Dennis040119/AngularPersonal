import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { DetalleJuegoComponent } from '../detalle-juego/detalle-juego.component';
import { FormCompraComponent } from '../form-compra/form-compra.component';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';

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
    this.dataSource = new MatTableDataSource(VideojuegosHome.carrito);

    
    
    
    
    

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit() {
  }

  delete(v:Videojuegos){

    console.log(v)
    var conta:number=0
    conta =VideojuegosHome.carrito.indexOf(v,0);
    

    if(conta >-1){
      console.log(conta)
      VideojuegosHome.carrito.splice(conta,1)
      this.dataSource.filter ="";
    
    }else{
      console.log("No se encuentra en el carrito")
    }
  }

  detalle(vj:Videojuegos){
    const dialogCrear = this.dialog.open(DetalleJuegoComponent, {
      
      width: '600px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vj,
        tipo :1
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      
       
        this.dataSource.filter = ""
        //console.log(this.carrito)

      
    });
  }

  close(){
    this.dialogRef.close(VideojuegosHome.carrito);
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

export { FormCompraComponent };
