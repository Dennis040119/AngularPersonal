import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VideoConsola } from 'src/app/models/video-consola';
import { VideoJuegoServiceService } from '../services/video-juego-service.service';
import { VideoConsolaServiceService } from '../services/video-consola-service.service';
import { EnumService } from '../services/enum.service';
import { ModalVcComponent } from './modal-vc/modal-vc.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-crud-vc',
  templateUrl: './crud-vc.component.html',
  styleUrls: ['./crud-vc.component.css']
})
export class CrudVcComponent implements OnInit {
  listaVc:VideoConsola[]=[]
  displayedColumns = ['nombre', 'precio','plataforma' ,'marca','options'];
  dataSource = new MatTableDataSource(this.listaVc);

  dataRest:any

  constructor(
    
    private dialog: MatDialog,
    private VcService:VideoConsolaServiceService,
    private EnumService:EnumService
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
    {this.listaVc=data;
    this.dataSource = new MatTableDataSource(this.listaVc);
    })
}
agregar() {
const dialog = this.dialog.open(ModalVcComponent, {
      
  width: '600px',
  height: '700px',
  autoFocus: false,
  data:{tipo:"save"}
  
});
dialog.afterClosed().subscribe(data => {
  
   this.construirtabla();
    this.dataSource.filter = ""});
}

downloadPdf() {

}
downloadExcel() {

}
edit(Vc:VideoConsola){
  const dialog = this.dialog.open(ModalVcComponent, {
      
    width: '600px',
    height: '700px',
    autoFocus: false,
    data:{
      tipo:"update",
      obj:Vc}
    
  });
  dialog.afterClosed().subscribe(data => {
    
     this.construirtabla();
      this.dataSource.filter = ""});
  

}
detalle(Vc:VideoConsola) {
  const dialog = this.dialog.open(ModalVcComponent, {
      
    width: '600px',
    height: '700px',
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
      tipo:"update",
      obj:Vc}
    
  });
  dialog.afterClosed().subscribe(data => {
    if(data=="Si"){
      this.VcService.eliminarVc(Vc.vcid).subscribe(data =>{
        this.dataRest=data
        if(this.dataRest["mensaje"]=="Elimnado correctamente"){
          AppComponent.consola(this.dataRest["mensaje"])
        }else{
          AppComponent.consola(this.dataRest["mensaje"])
        }
      })
    }
     this.construirtabla();
     this.dataSource.filter = ""});
}

}