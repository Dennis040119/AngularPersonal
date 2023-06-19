import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { Plataforma } from 'src/app/models/enum/plataforma';

import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { ModalVjComponent } from './modal-vj/modal-vj.component';
import { DetalleJuegoComponent } from '../../User/modal_juego/detalle-juego/detalle-juego.component';
import { VideojuegosHome } from '../../User/VideoJuegosHome/VideoJuegosHome.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';
import * as XLSX from 'xlsx'

///pdf imports

import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


import { EnumService } from '../services/enum.service';
import { DataSource } from '@angular/cdk/collections';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-crud-vj',
  templateUrl: 'crud-vj.component.html',
  styleUrls: ['crud-vj.component.css']
})
export class CrudVjComponent implements OnInit,AfterViewInit  {

  listavj!: Videojuegos[];
  displayedColumns = ['nombre', 'precio','genero' ,'plataformas','options'];
  dataSource = new MatTableDataSource(this.listavj);

  //Respuesta de servicios
  respta:any

  //Audio de fondo
  audioPlayer!: HTMLAudioElement;
  @ViewChild('audioPlayer') audioPlayerRef: any;
  PlataformList: Plataforma[];

  constructor(
    
    private dialog: MatDialog,
    private VjService:VideoJuegoServiceService,
    private EnumService:EnumService
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){ this.audioPlayer = new Audio();}


  ngOnInit(): void {
    this.construirtabla();
    console.log(this.listavj)
    
  }
  ngAfterViewInit() {
    
    this.audioPlayer.src = '../../../assets/audio/enemy.mp3';
    
    //const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    //this.audioPlayer.load();
    //this.audioPlayer.play();
    
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
      height: '700px',
      autoFocus: false,
      data:{tipo:"save"}
      
    });
    dialogCrear.afterClosed().subscribe(data => {
      
       this.construirtabla();
        this.dataSource.filter = ""});
  }

  edit(vj:Videojuegos){

    const dialogCrear = this.dialog.open(ModalVjComponent, {
      
      width: '600px',
      height: '700px',
      autoFocus: false,
      data:{objeto:vj,tipo:"edit"}
    });
    dialogCrear.afterClosed().subscribe(data => {
      
       this.construirtabla();
        this.dataSource.filter = "" });
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
      tempObj.push(e.plataformas);
      tempObj.push(e.img);
      

      prepare.push(tempObj)
      
    });
    const doc = new jsPDF('l');
    autoTable(doc,{
      
        head: [['Id','nombre','precio','descripcion','plataforma','img']],
        body: prepare,

        theme: 'grid' ,


        
    });
    

    ////Poner imagenes
     
    

    //Abrir solo el visor del navegador
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open()!;
    x.document.open(embed);
    x.document.write(embed);
    x.document.close();
    //doc.save('VideoJuegos_List' + '.pdf');
  }
  downloadExcel(){

    this.VjService.listarVideoJuegos().subscribe((data) =>
    {this.listavj=data;
    this.EnumService.exportToExcel(this.listavj, 'Reporte_VideoJuegos', 'Reporte_VideoJuegos');
    })
  }

  plataformasConvert(plata:string){
    var rpta:string|undefined
    var pla1:string|undefined
    var pla2:string|undefined
    var pla3:string|undefined

    
  }
}


export { ModalVjComponent };
