import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Genero } from 'src/app/models/genero';
import { Plataforma } from 'src/app/models/plataforma';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideoJuegoServiceService } from '../../Admin/services/video-juego-service.service';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { DetalleJuegoComponent } from '../modal_juego/detalle-juego/detalle-juego.component';
import { VideoConsola } from 'src/app/models/video-consola';
import { EnumService } from '../../Admin/services/enum.service';
import { VideoConsolaServiceService } from '../../Admin/services/video-consola-service.service';
import { DetalleVideconsolaComponent } from '../modal_juego/detalle-videconsola/detalle-videconsola.component';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-video-consolas-home',
  templateUrl: './video-consolas-home.component.html',
  styleUrls: ['./video-consolas-home.component.css']
})
export class VideoConsolasHomeComponent {
  static carrito:VideoConsola[] = [];
  acumulador: number=0
  tiles:VideoConsola[] = []
  resguardo:VideoConsola[]
  MarcaList:Marca[]
  PlataformasList:Plataforma[]

  //NgModels
  SelectionMarca:string
  SelectionPrecio:number
  Nombrefiltrer:string=""

  constructor(
    private dialog: MatDialog,
    private VcService:VideoConsolaServiceService,
    private EnumService:EnumService
    
  ) {}


  ngOnInit(): void {
    this.listarVideoConsola();
    this.comboEnums()
    console.log(this.tiles)
    
  }

  
  applyFilter() {
    AppComponent.consola(this.Nombrefiltrer+" , " + this.SelectionMarca+" , "+this.SelectionPrecio)
    
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.tiles=this.resguardo
    if(this.Nombrefiltrer!=""){
      var filtrado= this.tiles.filter(vc => vc.nombre.toLowerCase().includes(this.Nombrefiltrer.toLowerCase()));
      this.tiles=filtrado
    }

     if(this.SelectionMarca!="ge000" && this.SelectionMarca!=undefined){
      var filtrado =this.tiles.filter(vc => vc.marca==this.SelectionMarca )
      this.tiles=filtrado
     }

     if(this.SelectionPrecio!=0 && this.SelectionPrecio!=undefined){
      var filtrado:VideoConsola[]=[]

      if(this.SelectionPrecio==1){
        filtrado=this.tiles.filter(vc => vc.precio<1000)
      }
      if(this.SelectionPrecio==2){
        filtrado=this.tiles.filter(vc => vc.precio>=1000 && vc.precio<=2000)
      }
      if(this.SelectionPrecio==3){
        filtrado=this.tiles.filter(vc => vc.precio>2000)
      }

      this.tiles=filtrado
     
     }


    
  }

  clearFilter(){
    this.tiles=this.resguardo
    this.Nombrefiltrer=""
    this.SelectionMarca=""
    this.SelectionPrecio=0
  }
  comboEnums(){
    this.EnumService.listarMarcas().subscribe(data =>{
      this.MarcaList=data
      
    })

    this.EnumService.listarPlataformas().subscribe(data =>{
      this.PlataformasList=data
      this.PlataformasList.splice(0,1)
    })
  }
  DetalleModal(vc:VideoConsola){

    const dialogCrear = this.dialog.open(DetalleVideconsolaComponent, {
      
      width: '600px',
      height: '350px',
      autoFocus: false,
      
      data: {
        objeto:vc,
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


  listarVideoConsola(){
    this.VcService.listarVideoConsolas().subscribe((data) =>{

      if(data!=undefined){
        this.tiles=data;
        this.resguardo=data
      }
      
    })
  }
}
