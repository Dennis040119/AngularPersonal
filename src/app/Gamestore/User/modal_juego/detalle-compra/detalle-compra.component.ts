import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { DetalleJuegoComponent } from '../../VideoJuegosHome/Card-Videojuego/detalle-juego.component';
import { FormCompraComponent } from '../form-compra/form-compra.component';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { ProductosVenta } from 'src/app/models/cliente/productos-venta';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { VideoConsolaServiceService } from 'src/app/Gamestore/Admin/services/video-consola-service.service';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { DetalleVideconsolaComponent } from '../../video-consolas-home/detalle-videconsola/detalle-videconsola.component';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {
  
  
  carrito:ProductosVenta[]=[];
  
  vjOutPut:Videojuegos
  vcOutPut:VideoConsola
  
  

  displayedColumns = ['Id', 'nombre', 'precio','cantidad' ,'portada','options'];
  dataSource = new MatTableDataSource(this.carrito);
  
  

  constructor(
    
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleCompraComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ProductosVenta[],

    //Servicios
    private VjService:VideoJuegoServiceService,
    private VcService:VideoConsolaServiceService
  
  ){}

  ngOnInit(): void {
    
    
    console.log(VideojuegosHome.carrito);
    //console.log(this.carrito.length)
    this.dataSource = new MatTableDataSource(VideojuegosHome.carrito);

    
    
    
    
    

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit() {
  }

  delete(v:ProductosVenta){

    console.log(v)
    var conta:number=0
    conta =VideojuegosHome.carrito.findIndex(pv => pv.productosVentaPk==v.productosVentaPk);
    

    if(conta >-1){
      console.log(conta)
      VideojuegosHome.carrito.splice(conta,1)
      this.dataSource.filter ="";
    
    }else{
      console.log("No se encuentra en el carrito")
    }
  }

  detalle(Pv:ProductosVenta){

    if(Pv.productosVentaPk.proId.includes("vj")){
        this.VjService.buscarVideoJuegos(Pv.productosVentaPk.proId).subscribe({

          next:(result) =>{
            console.log(result)
            this.vjOutPut=result[0]
            
            
          },
          error:(error)=>{

          },
          complete: ()=>{
            console.log(this.vjOutPut)
            this.detalleJuego(this.vjOutPut)
          }


        })
    }

    if(Pv.productosVentaPk.proId.includes("vc")){
      this.VcService.buscarVideoCon(Pv.productosVentaPk.proId).subscribe({

        next:(result) =>{
          this.vcOutPut=result[0]
        },
        error:(error)=>{

        },
        complete: ()=>{
          this.detalleConsola(this.vcOutPut)
        }


      })
    }
    
  }

  detalleJuego(vj:Videojuegos){
    console.log(vj)
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

  detalleConsola(vc:VideoConsola){
    const dialogCrear = this.dialog.open(DetalleVideconsolaComponent, {
      
      width: '600px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vc,
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
