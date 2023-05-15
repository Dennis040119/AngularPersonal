import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from '../agregar/agregar.component';
import { Elemento } from '../../models/elemento';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  ELEMENT_DATA: Elemento[] = [];
  adicion?:Elemento;



  displayedColumns = ['position', 'name', 'weight', 'symbol','options'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  data: any;
  

  constructor(
    
    private dialog: MatDialog
  
  ){}

  ngOnInit(): void {
    this.construirtabla();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  

  agregar() {
    const dialogCrear = this.dialog.open(AgregarComponent, {
      width: '350px',
      height: '350px',
      autoFocus: false,
      disableClose: true,
      data: {
        tipo :0
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {
        
        
        
        console.log(this.ELEMENT_DATA.length)
        data['posicion']=(this.ELEMENT_DATA.length+1);
        console.log(data)
        this.ELEMENT_DATA.push(data)
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      } else {
       
      }
    })
  }
  detalle(e:Elemento) {
    const dialogCrear = this.dialog.open(AgregarComponent, {
      width: '350px',
      height: '350px',
      autoFocus: false,
      disableClose: true,
      data: {
        objeto: e,
        tipo: 1
      }
    });
    
  }

  edit(e:Elemento) {
    const dialogCrear = this.dialog.open(AgregarComponent, {
      width: '350px',
      height: '350px',
      autoFocus: false,
      disableClose: true,
      data: {
        objeto: e,
        tipo: 2
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {
        
      } else {
       
      }
    })
  }

  delete(e:Elemento){

    var conta:number=0
    conta =this.ELEMENT_DATA.indexOf(e);

    this.ELEMENT_DATA.splice(conta,1)
    console.log(this.ELEMENT_DATA)
    
    this.dataSource.filter = ""
    
  }

 

  construirtabla(){
    this.ELEMENT_DATA?.push();
    this.ELEMENT_DATA?.push(new Elemento(1,'Hydrogen',1.0079,'H'));
    this.ELEMENT_DATA?.push(new Elemento(2,'Helium',4.0026,'He'));
    this.ELEMENT_DATA?.push(new Elemento( 3,'Lithium',  6.941,  'Li'));
    this.ELEMENT_DATA?.push(new Elemento(4,  'Beryllium',  9.0122, 'Be'));
    this.ELEMENT_DATA?.push(new Elemento( 5,  'Boron',  10.811,  'B'));
    this.ELEMENT_DATA?.push(new Elemento( 6,  'Carbon', 12.0107,  'C'));
    this.ELEMENT_DATA?.push(new Elemento(7,  'Nitrogen',  14.0067,  'N'));
    this.ELEMENT_DATA?.push(new Elemento( 8,  'Oxygen',  15.9994,  'O'));
    this.ELEMENT_DATA?.push(new Elemento( 9,  'Fluorine',  18.9984, 'F'));
  }


}

  
