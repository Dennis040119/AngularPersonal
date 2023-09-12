import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from '../../../services/mtnm/usuario.service';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';
import { IndexAdminComponent } from '../index-admin/index-admin.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  listaUsu!: Usuario[];
  displayedColumns = ['user', 'email', 'direcion','rol','activo','foto','options'];
  dataSource = new MatTableDataSource(this.listaUsu);

  //Respuesta de servicios
  respta:any

  constructor(
    
    private dialog: MatDialog,
    private UsuarioService:UsuarioService,
    private IndexAmdmin:IndexAdminComponent
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){}

  ngOnInit(): void {
    this.construirtabla();
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  getImagen(filename:string,dir:string){
   return this.IndexAmdmin.getimagen(filename,dir)
  }
  construirtabla(){
    this.UsuarioService.listarUsuarios().subscribe((data) =>
      {this.listaUsu=data;
      this.dataSource = new MatTableDataSource(this.listaUsu);
      this.dataSource.paginator = this.paginator;
      })
  }


  agregar() {
    const dialog = this.dialog.open(ModalUserComponent,{
      
      width: '40%',
      height: '95%',
      autoFocus: false,
      disableClose:true,
      data:{
        obj:null,
        tipo:"registrar"
      }
    });
    dialog.afterClosed().subscribe(data => {
      
      this.construirtabla();
      this.dataSource.filter = ""
      });

  }
    edit(user: Usuario) {
      const dialog = this.dialog.open(ModalUserComponent,{
      
        width: '40%',
        height: '95%',
        autoFocus: false,
        disableClose:true,
        data:{
          obj:user,
          tipo:"edit"
        }
      });
      dialog.afterClosed().subscribe(data => {
      
        this.construirtabla();
        this.dataSource.filter = ""
        });
  
    }
    
    detalle(user: Usuario) {
      const dialog = this.dialog.open(ModalUserComponent,{
      
        width: '40%',
        height: '95%',
        autoFocus: false,
        data:{
          obj:user,
          tipo:"view"
        }
      });
    }
    delete(user: Usuario) {
      const dialog = this.dialog.open(DialogConfirmComponent,{
      
        width: '300px',
        height: '120px',
        autoFocus: false,
      });
      dialog.afterClosed().subscribe(data => {
        console.log(data)
        if(data=="Si"){
          this.UsuarioService.eliminar(user.userid).subscribe(data =>{
            this.respta=data
            window.alert(this.respta["mensaje"]);
          this.construirtabla();
          this.dataSource.filter = ""
        })

        }else{
          console.log("no elimino "+data)
          this.construirtabla();
          this.dataSource.filter = ""
        }
        
      })
    }
    


}
