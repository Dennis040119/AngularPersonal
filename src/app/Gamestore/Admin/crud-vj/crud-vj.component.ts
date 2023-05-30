import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { ModalVjComponent } from './modal-vj/modal-vj.component';
import { DetalleJuegoComponent } from '../../User/modal_juego/detalle-juego/detalle-juego.component';
import { IndexComponent } from '../../User/indexUser/index.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-crud-vj',
  templateUrl: './crud-vj.component.html',
  styleUrls: ['./crud-vj.component.css']
})
export class CrudVjComponent implements OnInit {

  listavj!: Videojuegos[];
  displayedColumns = ['nombre', 'precio', 'plataformas','options'];
  dataSource = new MatTableDataSource(this.listavj);

  //Respuesta de servicios
  respta:any

  constructor(
    
    private dialog: MatDialog,
    private VjService:VideoJuegoServiceService,
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){}


  ngOnInit(): void {
    this.construirtabla();
    console.log(this.listavj)
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  construirtabla(){
    this.VjService.listarVideoJuegos().subscribe((data) =>
      {this.listavj=data;
      this.dataSource = new MatTableDataSource(this.listavj);
      })
  }

  agregar(){
    const dialogCrear = this.dialog.open(ModalVjComponent, {
      
      width: '600px',
      height: '800x',
      autoFocus: false,
    });
    dialogCrear.afterClosed().subscribe(data => {
      
       this.construirtabla();
        this.dataSource.filter = ""
        

      
    });
  }

  edit(vj:Videojuegos){

    const dialogCrear = this.dialog.open(ModalVjComponent, {
      
      width: '600px',
      height: '800x',
      autoFocus: false,
      data:{objeto:vj,tipo:"edit"}
    });
    dialogCrear.afterClosed().subscribe(data => {
      
       this.construirtabla();
        this.dataSource.filter = ""
        

      
    });
    

  }

  delete(vj:Videojuegos){


     const dialogConfirm=this.dialog.open(DialogConfirmComponent,{

      width: '200px',
      height: '100px',
      autoFocus: false,
      role:'dialog',
      data:{objeto:vj}

    });

    dialogConfirm.afterClosed().subscribe(data =>{
      console.log(data)
      if(data=="Si"){
        this.VjService.eliminarVj(vj.id).subscribe((data) =>{
          this.respta = data
    
          try {
            if(this.respta['mensaje'] == "Elimnado correctamente"){window.alert(this.respta['mensaje'])}else{
            window.alert(this.respta['mensaje'])}
          } catch (error) {window.alert(this.respta['mensaje']+"  "+error)}
          finally{this.construirtabla()}
        })
      }else{
        this.construirtabla()
      }
    })
    
  }

  detalle(vj:Videojuegos){

    const dialogCrear = this.dialog.open(DetalleJuegoComponent, {
      
      width: '600px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vj,
        tipo :2
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {

        IndexComponent.carrito.push(data);
        
        //console.log(this.carrito)

      } else {}

      
    })
  }
}

export { ModalVjComponent };
