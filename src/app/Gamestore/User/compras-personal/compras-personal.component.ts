import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IndexAdminComponent } from '../../Admin/index-admin/index-admin.component';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { VentaService } from 'src/app/services/mtnm/venta.service';
import { Venta } from 'src/app/models/cliente/venta';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { ProductoVentaService } from 'src/app/services/mtnm/producto-venta.service';

@Component({
  selector: 'app-compras-personal',
  templateUrl: './compras-personal.component.html',
  styleUrls: ['./compras-personal.component.css']
})
export class ComprasPersonalComponent implements  OnInit {
  
  
  

  listaVenta!: Venta[];
  displayedColumns = ['IdVenta', 'Usuario', 'Total','Correo','Direccion','FechaCompra','FechaEntrega','options'];
  dataSource = new MatTableDataSource(this.listaVenta);

  //Respuesta de servicios
  respta:any

  constructor(
    
    private dialog: MatDialog,
    private VentaService:VentaService,
    private ProductoVentaService:ProductoVentaService,
    private UserService:UsuarioService,
    
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){}

  ngOnInit(): void {
   this.construirtabla()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  getImagen(filename:string,dir:string){
    
   }
   construirtabla(){
    var username= localStorage.getItem("user")!
    this.UserService.BuscarPorUser(username).subscribe( {
      next:(data)=>{

        this.VentaService.UserVentas(data[0].userid).subscribe({

          next:(data)=>{
            this.listaVenta=data;
            this.dataSource = new MatTableDataSource(this.listaVenta);
          },
          error:(error)=>{},
          complete:()=>{}


          })
      },
      error:(error)=>{},
      complete:()=>{}
      
    
    });

    
  }
  detalle(obj:Venta){
    

    this.ProductoVentaService.listarProductosPorVenta(obj.venId).subscribe({
      next:(result)=>{
        console.log(result);
        const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
          width: '1100px',
          height: '600px',
          autoFocus: false,
          
          data: result,
  
        });
  
        dialogCrear.afterClosed().subscribe(data => {
  
            
        });
      },
      error(err) {
        
      },
      complete() {
        
      },
    })
  
      
  
   }

 
 

}
