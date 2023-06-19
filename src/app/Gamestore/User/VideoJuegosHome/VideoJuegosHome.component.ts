import { Component, OnInit } from '@angular/core';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import {DetalleJuegoComponent} from '../modal_juego/detalle-juego/detalle-juego.component'
import { MatDialog } from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { AppComponent } from 'src/app/app.component';
import { EnumService } from '../../Admin/services/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';


declare var carrito2: Videojuegos[];

@Component({
  selector: 'app-root',
  templateUrl: './VideojuegosHome.component.html',
  styleUrls: ['./VideojuegosHome.component.css']
})
export class VideojuegosHome implements OnInit {

  static carrito:Videojuegos[] = [];
  acumulador: number=0
  tiles:Videojuegos[] = []
  resguardo:Videojuegos[]
  GenerosList:Genero[]
  PlataformasList:Plataforma[]

  //NgModels
  SelectionGene:string
  SelectionPlata:string
  Nombrefiltrer:string=""

  constructor(
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService
    
  ) {}


  ngOnInit(): void {
    this.listarVideoJuegos();
    this.comboEnums()
    console.log(this.tiles)
    
  }

  
  applyFilter() {
    AppComponent.consola(this.Nombrefiltrer+" , " + this.SelectionGene+" , "+this.SelectionPlata)
    
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.tiles=this.resguardo
    if(this.Nombrefiltrer!=""){
      var filtrado= this.tiles.filter(vj => vj.nombre.toLowerCase().includes(this.Nombrefiltrer.toLowerCase()));
      this.tiles=filtrado
    }

    if(this.SelectionGene!="ge000" && this.SelectionGene!=undefined){
      var filtrado =this.tiles.filter(vj => vj.genero.id.includes(this.SelectionGene.trim().toLowerCase()) )
      this.tiles=filtrado
    }

    if(this.SelectionPlata!="pf000" && this.SelectionPlata!=undefined){
      var filtrado =this.tiles.filter(vj => vj.plataformas.includes(this.SelectionPlata.trim().toLowerCase()) )
      this.tiles=filtrado
    }


    
  }

  clearFilter(){
    this.tiles=this.resguardo
    this.Nombrefiltrer=""
    this.SelectionGene=""
    this.SelectionPlata=""
  }
  comboEnums(){
    this.EnumService.listarGenero().subscribe(data =>{
      this.GenerosList=data
      this.GenerosList.splice(0,1)
    })

    this.EnumService.listarPlataformas().subscribe(data =>{
      this.PlataformasList=data
      this.PlataformasList.splice(0,1)
    })
  }
  DetalleModal(vj:Videojuegos){

    const dialogCrear = this.dialog.open(DetalleJuegoComponent, {
      
      width: '650px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vj,
        tipo :0
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {

        VideojuegosHome.carrito.push(data);
        
        //console.log(this.carrito)

      } else {}

      this.SumaTotal();
    })
  }

  SumaTotal(){
    this.acumulador=0;
    VideojuegosHome.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }

  DetalleCarritoModal(){

    if(VideojuegosHome.carrito.length>0){
      
      const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
        width: '1100px',
        height: '500px',
        autoFocus: false,
        
        data: VideojuegosHome.carrito,

      });

      dialogCrear.afterClosed().subscribe(data => {

          console.log(VideojuegosHome.carrito)
          console.log(this.acumulador)
          this.SumaTotal()
      });
      
    }else{window.alert("El carrito esta vacio");}
    
  }


  listarVideoJuegos(){
    this.VideoJuegoService.listarVideoJuegos().subscribe((data) =>{

      if(data!=undefined){
        this.tiles=data;
        this.resguardo=data
      }
      
    })
  }

  
}
