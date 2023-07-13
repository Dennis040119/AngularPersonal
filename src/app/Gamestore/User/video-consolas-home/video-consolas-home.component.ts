import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { EnumService } from '../../Admin/services/enum.service';
import { VideoConsolaServiceService } from '../../Admin/services/video-consola-service.service';
import { DetalleVideconsolaComponent } from './detalle-videconsola/detalle-videconsola.component';
import { Marca } from 'src/app/models/enum/marca';
import { IndexUserComponent } from '../index-user/index-user.component';
import { ProductosVentaPk, ProductosVenta } from 'src/app/models/cliente/productos-venta';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-video-consolas-home',
  templateUrl: './video-consolas-home.component.html',
  styleUrls: ['./video-consolas-home.component.css']
})
export class VideoConsolasHomeComponent implements OnInit,AfterViewInit {
  static carrito:VideoConsola[] = [];
  acumulador: number=0
  tiles:VideoConsola[] = []
  resguardo:VideoConsola[]
  MarcaList:Marca[]
  PlataformasList:Plataforma[]

  //
  Pv:ProductosVenta

  //NgModels
  SelectionMarca:string
  SelectionPrecio:number
  Nombrefiltrer:string=""


  preloaderTime:boolean=true

  constructor(
    private dialog: MatDialog,
    private VcService:VideoConsolaServiceService,
    private EnumService:EnumService,
    private IndexInstancia:IndexUserComponent,
    private route: ActivatedRoute,
    
  ) {}


  ngOnInit(): void {
    this.listarVideoConsola();
    this.comboEnums()
    console.log(this.tiles)

    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
      this.IndexInstancia.carrusel(false)
    }, 800);
    
  }

  ngAfterViewInit(): void {

    this.getParametrosDato();
  
   }

  getParametrosDato(){

    this.route.params.pipe(
      switchMap(params => {
      var parametro = ""
      parametro = params['marca'];
      return parametro
    })
    )
    .subscribe({
      next: (param)=>{
        console.log(param)
        this.SelectionMarca=param
        
        this.VcService.listarVideoConsolas().subscribe({
          next:data=>{
            if(data!=undefined){this.tiles=data;}
          },
          complete:()=>{
            console.log(this.SelectionMarca)
            this.resguardo=this.tiles
            this.applyFilter()
          }
        })
      }
      ,
      error: (error)=>{console.log("Error: "+error)}
      ,
      complete:()=>{}
    });

   this.route.params.subscribe(data=>{
      this.SelectionMarca=data['marca'];
    })


    
  }
  applyFilter() {
    
    this.preloaderTime=true
    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
      this.IndexInstancia.carrusel(false)
    }, 500);
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.tiles=this.resguardo


    if(this.Nombrefiltrer!=""){
      var filtrado= this.tiles.filter(vc => vc.nombre.toLowerCase().includes(this.Nombrefiltrer.toLowerCase()));
      this.tiles=filtrado
    }

     if(this.SelectionMarca!=("mc000" &&"") && this.SelectionMarca!=undefined){

      console.log("Selecion marca"+this.SelectionMarca)
         var nombre:string
      this.EnumService.listarMarcas().subscribe({
       
        next:data=>{
          console.log("next data")
          nombre=data.find(mc => mc.idMarca==this.SelectionMarca)!.nombre
          console.log(nombre)
        },
        error:error=>{

        },
        complete:()=>{
          var filtrado =this.tiles.filter(vc => vc.marca==nombre )
          this.tiles=filtrado
        }
      })
      
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
    
    this.preloaderTime=true
    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
    }, 500);
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

        var vj:VideoConsola=data
        var pk:ProductosVentaPk=new ProductosVentaPk("",vj.vcid)
        this.Pv=new ProductosVenta(pk,vj.nombre,vj.precio,1,"pv",vj.img)
        

        if(VideojuegosHome.carrito.find(e => e.productosVentaPk.proId==this.Pv.productosVentaPk.proId)){
         
         var index:number= VideojuegosHome.carrito.findIndex(e => e.productosVentaPk.proId==this.Pv.productosVentaPk.proId)

            if(index!=-1){
              VideojuegosHome.carrito[index].cantidad=VideojuegosHome.carrito[index].cantidad+1
              VideojuegosHome.carrito[index].precio=VideojuegosHome.carrito[index].precio+vj.precio
            }

        }else{
          VideojuegosHome.carrito.push(this.Pv);
        }

        //VideojuegosHome.carrito.push(this.Pv);
        
        //console.log(this.carrito)

      } else {}

      this.IndexInstancia.SumaTotal()
    })
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
          this.IndexInstancia.SumaTotal()
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
