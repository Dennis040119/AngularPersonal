import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideoJuegoServiceService } from 'src/app/services/video-juego-service.service';
import { ModalVjComponent } from './modal-vj/modal-vj.component';

@Component({
  selector: 'app-crud-vj',
  templateUrl: './crud-vj.component.html',
  styleUrls: ['./crud-vj.component.css']
})
export class CrudVjComponent implements OnInit {

  listavj!: Videojuegos[];
  displayedColumns = ['nombre', 'precio', 'plataformas','options'];
  dataSource = new MatTableDataSource(this.listavj);

  constructor(
    
    private dialog: MatDialog,
    private VjService:VideoJuegoServiceService,
  
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
        //console.log(this.carrito)

      
    });
  }

  edit(vj:Videojuegos){

  }

  delete(vj:Videojuegos){
    
  }

  detalle(vj:Videojuegos){
    
  }
}
