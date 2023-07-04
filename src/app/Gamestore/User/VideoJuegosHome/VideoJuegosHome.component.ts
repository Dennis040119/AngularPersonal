import { IndexUserComponent } from './../index-user/index-user.component';
import { Component, OnInit } from '@angular/core';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import {DetalleJuegoComponent} from './Card-Videojuego/detalle-juego.component'
import { MatDialog } from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { AppComponent } from 'src/app/app.component';
import { EnumService } from '../../Admin/services/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { ProductosVenta, ProductosVentaPk } from 'src/app/models/cliente/productos-venta';
import { element } from 'prop-types';


declare var carrito2: Videojuegos[];

@Component({
  selector: 'app-root',
  templateUrl: './VideojuegosHome.component.html',
  styleUrls: ['./VideojuegosHome.component.css']
})
export class VideojuegosHome implements OnInit {

  static carrito:ProductosVenta[] = [];
  Pv:ProductosVenta


  acumulador: number=0
  tiles:Videojuegos[] = []
  resguardo:Videojuegos[]
  GenerosList:Genero[]
  PlataformasList:Plataforma[]

  //NgModels
  SelectionGene:string
  SelectionPlata:string
  Nombrefiltrer:string=""

  //Preloader
  preloaderTime:boolean=true

  constructor(
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService,
    private IndexInstancia:IndexUserComponent
    
  ) {}


  ngOnInit(): void {
    this.listarVideoJuegos();
    this.comboEnums()
    console.log(this.tiles)

    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
    }, 1000);
    
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
      var filtrado =this.tiles.filter(vj => vj.genero.genId.includes(this.SelectionGene.trim().toLowerCase()) )
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
      
      maxWidth: '420px',
      maxHeight: '700px',
      autoFocus: false,
      
      data: {
        objeto:vj,
        tipo :0
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data != undefined) {

        var vj:Videojuegos=data
        
        //Seteamos los valores del producto
        console.log(vj)
        var pk:ProductosVentaPk=new ProductosVentaPk("",vj.id)
        this.Pv=new ProductosVenta(pk,vj.nombre,vj.precio,1,"pv",vj.img)
        console.log(this.Pv)
        ///
        if(VideojuegosHome.carrito.find(e => e.productosVentaPk.proId==this.Pv.productosVentaPk.proId)){
         
         var index:number= VideojuegosHome.carrito.findIndex(e => e.productosVentaPk.proId==this.Pv.productosVentaPk.proId)

            if(index!=-1){
              VideojuegosHome.carrito[index].cantidad=VideojuegosHome.carrito[index].cantidad+1
              VideojuegosHome.carrito[index].precio=VideojuegosHome.carrito[index].precio+vj.precio
           
            }

        }else{
          VideojuegosHome.carrito.push(this.Pv);
        }
        ///
        
        
        //console.log(this.carrito)

      } else {}

      this.IndexInstancia.SumaTotal()
    })
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
