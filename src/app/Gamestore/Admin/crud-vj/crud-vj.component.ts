import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { Plataforma } from 'src/app/models/enum/plataforma';

import { VideoJuegoServiceService } from 'src/app/services/mtnm/video-juego-service.service';
import { ModalVjComponent } from './modal-vj/modal-vj.component';
import { DetalleJuegoComponent } from '../../User/VideoJuegosHome/Card-Videojuego/detalle-juego.component';
import { VideojuegosHome } from '../../User/VideoJuegosHome/VideoJuegosHome.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';
import * as XLSX from 'xlsx'

///pdf imports

//import 'jspdf-autotable';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


import { EnumService } from '../../../services/mtnm/enum.service';
import { DataSource } from '@angular/cdk/collections';
import { AppComponent } from 'src/app/app.component';
import { array, bool } from 'prop-types';
import { MatPaginator } from '@angular/material/paginator';
import { StorageService } from 'src/app/services/medias/storage.service';
import { IndexAdminComponent } from '../index-admin/index-admin.component';



@Component({
  selector: 'app-crud-vj',
  templateUrl: 'crud-vj.component.html',
  styleUrls: ['crud-vj.component.css']
})
export class CrudVjComponent implements OnInit,AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listavj!: Videojuegos[];
  displayedColumns = ['nombre', 'precio','genero' ,'plataformas','img','options'];
  dataSource = new MatTableDataSource(this.listavj);

  //Respuesta de servicios
  respta:any

  //Audio de fondo
  audioPlayer!: HTMLAudioElement;
  @ViewChild('audioPlayer') audioPlayerRef: any;
  PlataformList: Plataforma[];


  dirImgVj:string="imgVideojuegos"

  constructor(
    
    private dialog: MatDialog,
    private VjService:VideoJuegoServiceService,
    private EnumService:EnumService,
    private imgService:StorageService,
    private indexAdmin:IndexAdminComponent
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){ this.audioPlayer = new Audio();}


  ngOnInit(): void {
    this.listavj=[]
    this.construirtabla();
    
    
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
    this.VjService.listarVideoJuegos().subscribe({

    next:(data) =>{
      this.listavj=data;
      this.dataSource = new MatTableDataSource(this.listavj);
      
     },
     error:(data)=>{
      window.alert("no se pudo obtener los datos: "+data)
     },
      complete:()=>{
        this.dataSource.paginator = this.paginator;
        
      }
      
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
      
      width: '30%',
      height: '75%',
      
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

    const text:string[]=[]

    this.construirtabla();
    var prepare: any=[];

    //Seteamos los datos de la tabla un array que sera el contenido del pdf
    this.listavj.forEach(e=>{
      var tempObj =[];
      
      tempObj.push(e.id);
      tempObj.push(e.nombre);
      tempObj.push(e.precio);
      tempObj.push(e.descripcion);
      tempObj.push(e.plataformas);
      tempObj.push(e.img);
      //tempObj.push(`<img src="${e.img}" width="50" height="50">`);

      prepare.push(tempObj)
      
    });

    //Estilos de las columnas
    const columnWidths = [20, 40, 20, 60, 55, 40];
    //Numero de filas por pagina
    const maxRowsPerPage = 40; 
    let currentPage = 1;
    let rowIndex = 0;


    let isHeadRow = true;

    

    //Creamos el pdf 
    const doc = new jsPDF('l');

    
    autoTable(doc,{

        head: [['Id','Nombre','Precio','Descripcion','Plataformas','imagen']],
        body: prepare,
        theme: 'grid' ,

        didDrawPage: () => {
          rowIndex = 0;
          currentPage++;
          if (currentPage < doc.getNumberOfPages()) {
            //doc.setPage(currentPage);
          }
        },
        
        //Creamos un obj de tipo imagen y lo seteamos en el campo data.cell.raw para usarlo luego
        didParseCell: data => {

          ///Le da los anchos y altura a la tabla
           const row =data.row.index
           const col = data.column.index; // Índice de la columna
           data.cell.styles.cellWidth = columnWidths[col];
           
           if(isHeadRow && data.section != 'head'){
            data.cell.styles.minCellHeight = 35
          }
           
          //Obtiene las rutas de las celdas
          if (data.column.dataKey == 5) {
           
            const imgData = data.cell.raw;
            const img = new Image();
            var cadena = "../../../../assets/PortadasVj/"
            img.src =cadena+imgData!.toString()
            img.src =this.indexAdmin.getimagen(imgData!.toString(),"imgVideojuegos")
            console.log(imgData!.toString())
            data.cell.raw = img;
            
          }
        },
        //Elimina el texto de la columna dicha en este caso las rutas que pusheamos arriba al comienzo
        willDrawCell: data => {
          
          //Elimina el texto de la celda de imagenes
          if (data.column.dataKey == 5 ) {
            if(isHeadRow && data.section != 'head'){
              data.cell.text = text; // Eliminar el texto de la celda
            }
            
          }

          
        },

        //Aqui agregamos la imagen, la extraemos de data.cell.raw(contiene un obj tipo imagen), 
        //luego con addimagen colocamos la imagen en el pdf
        didDrawCell: data => {
          

          if (data.column.dataKey == 5 && data.cell.raw instanceof HTMLImageElement) {

            const img2=data.cell.raw
            console.log(img2.src)
           
            var array:string[]=[]
            
            var booleano:boolean=true
           
            ///La columna toma en cuenta la fila de titulo por lo cual salta error al no tener una ruta (titulo : imagen)
            //Evitamos que haga esto con un if
            if(isHeadRow && data.section != 'head'){
              array.push(img2.src)
              const img = img2;
              const { x, y, width, height } = data.cell;
              console.log(img)
              
              
              doc.addImage(img, x + 2, y + 2, 30, 25); // Ajustar el tamaño y la posición de la imagen según sea necesario
            
            }
           }

           if (rowIndex > maxRowsPerPage) {
            rowIndex = 0;
            //currentPage++;
            //doc.addPage();
          }
          rowIndex++;
        },
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

    console.log(plata)
    console.log(this.PlataformList)
    return "plataforma"
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }
}


export { ModalVjComponent };
