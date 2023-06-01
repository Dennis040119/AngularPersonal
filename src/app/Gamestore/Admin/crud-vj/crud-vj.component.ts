import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { ModalVjComponent } from './modal-vj/modal-vj.component';
import { DetalleJuegoComponent } from '../../User/modal_juego/detalle-juego/detalle-juego.component';
import { VideojuegosHome } from '../../User/VideoJuegosHome/VideoJuegosHome.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';

///pdf imports

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'



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

        VideojuegosHome.carrito.push(data);
        
        //console.log(this.carrito)

      } else {}

      
    })
  }
  downloadPdf() {

    this.construirtabla();
    var prepare: any=[];
    this.listavj.forEach(e=>{
      var tempObj =[];
      
      tempObj.push(e.id);
      tempObj.push(e.nombre);
      tempObj.push(e.precio);
      tempObj.push(e.descripcion);
      tempObj.push(e.plataforma1);
      tempObj.push(e.plataforma2);
      tempObj.push(e.plataforma2);
      tempObj.push(e.img);
      tempObj.push(e.color);

      prepare.push(tempObj)
      
    });
    const doc = new jsPDF('l');
    autoTable(doc,{
      
        head: [['Id','nombre','precio','descripcion','plataforma1','plataforma2'
        ,'plataforma3','img','color']],
        body: prepare,

        theme: 'grid' ,

        
    });

    ////Poner imagenes
     
    
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open()!;
    x.document.open(embed);
    x.document.write(embed);
    x.document.close();
    //doc.save('VideoJuegos_List' + '.pdf');
  }
}


export { ModalVjComponent };
