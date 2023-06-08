import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoJuegoServiceService } from '../services/video-juego-service.service';
import { UsuarioService } from '../../../login/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { DialogConfirmComponent } from 'src/app/axuliares/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {



  listaUsu!: Usuario[];
  displayedColumns = ['user', 'email', 'direcion','rol','options'];
  dataSource = new MatTableDataSource(this.listaUsu);

  //Respuesta de servicios
  respta:any

  constructor(
    
    private dialog: MatDialog,
    private UsuarioService:UsuarioService,
    //@Inject(MAT_DIALOG_DATA) private data: any,
  
  ){}

  ngOnInit(): void {
    this.construirtabla();
    console.log(this.listaUsu)
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  construirtabla(){
    this.UsuarioService.listarUsuarios().subscribe((data) =>
      {this.listaUsu=data;
      this.dataSource = new MatTableDataSource(this.listaUsu);
      })
  }


  agregar() {
    const dialog = this.dialog.open(ModalUserComponent,{
      
      width: '400px',
      height: '600px',
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
      
        width: '500px',
        height: '600px',
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
      
        width: '600px',
        height: '800px',
        autoFocus: false,
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
          this.UsuarioService.eliminar(user.id).subscribe(data =>{
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
