import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { VideoJuegoServiceService } from 'src/app/services/mtnm/video-juego-service.service';
import { VideoConsolaServiceService } from 'src/app/services/mtnm/video-consola-service.service';
import { EnumService } from '../../../services/mtnm/enum.service';
import { ModalVcComponent } from './modal-vc/modal-vc.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';
import { AppComponent } from 'src/app/app.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StorageService } from 'src/app/services/medias/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crud-vc',
  templateUrl: './crud-vc.component.html',
  styleUrls: ['./crud-vc.component.css']
})
export class CrudVcComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaVc:VideoConsola[]=[]
  displayedColumns = ['nombre', 'precio','plataforma' ,'marca','img','options'];
  dataSource = new MatTableDataSource(this.listaVc);

  dataRest:any
  selectedFile: File;
  selectedFileName: any;
  selectedFileUrl: any;

  dirImgVj:string="imgVideoConsolas"

  constructor(
    
    private dialog: MatDialog,
    private VcService:VideoConsolaServiceService,
    private EnumService:EnumService,
    private imgService:StorageService,
    private snackBar:MatSnackBar,
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){ }

ngOnInit(): void {
  this.construirtabla()
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

construirtabla(){
  this.VcService.listarVideoConsolas().subscribe((data) =>
   { this.listaVc=data;
    this.dataSource = new MatTableDataSource(this.listaVc);
    this.dataSource.paginator = this.paginator;
    })
}
agregar() {
const dialog = this.dialog.open(ModalVcComponent, {
      
  width: '600px',
  height: '600px',
  autoFocus: false,
  data:{tipo:"save"}
  
});
dialog.afterClosed().subscribe(data => {
  
   this.construirtabla();
  this.dataSource.filter = ""});
}



edit(Vc:VideoConsola){
  const dialog = this.dialog.open(ModalVcComponent, {
      
    width: '600px',
    height: '600px',
    autoFocus: false,
    data:{
      tipo:"edit",
      obj:Vc}
    
  });
  dialog.afterClosed().subscribe(data => {
    
     this.construirtabla();
      this.dataSource.filter = ""});
  

}
detalle(Vc:VideoConsola) {
  const dialog = this.dialog.open(ModalVcComponent, {
      
    width: '30%',
    height: '75%',
    
    autoFocus: false,
    data:{
      tipo:"detalle",
      obj:Vc}
    
  });
  dialog.afterClosed().subscribe(data => {
    
     this.construirtabla();
      this.dataSource.filter = ""});
}
delete(Vc:VideoConsola) {
  const dialog = this.dialog.open(DialogConfirmComponent, {
      
    width: '200px',
    height: '100px',
    autoFocus: false,
    data:{
      tipo:"eliminar",
      obj:Vc}
    
  });
  dialog.afterClosed().subscribe(data => {
    console.log(data)
    if(data=="Si"){
      
        this.VcService.eliminarVc(Vc.vcid).subscribe(data =>{
          this.dataRest=data
          if(this.dataRest["mensaje"]=="Elimnado correctamente"){ 
                AppComponent.consola(this.dataRest["mensaje"])
                this.construirtabla()
          }else{AppComponent.consola(this.dataRest["mensaje"])
          this.construirtabla()}
        });
    }
      
    this.construirtabla()
    this.dataSource.filter = ""
      
    
    });
  }
 
  downloadPdf() {

    this.construirtabla();
    var prepare: any=[];
    this.listaVc.forEach(e=>{
      var tempObj =[];
      
      tempObj.push(e.vcid);
      tempObj.push(e.nombre);
      tempObj.push(e.precio);
      tempObj.push(e.descripcion);
      tempObj.push(e.plataforma.nombre);
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


  downloadExcel() {
    this.VcService.listarVideoConsolas().subscribe((data) =>
    {this.listaVc=data;
    this.EnumService.exportToExcel(this.listaVc, 'Reporte_VideoConsolas', 'Reporte_VideoConsolas');
    })
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }
   
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

}