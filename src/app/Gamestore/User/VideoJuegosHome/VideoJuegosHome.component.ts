import { IndexUserComponent } from './../index-user/index-user.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import {DetalleJuegoComponent} from './Card-Videojuego/detalle-juego.component'
import { MatDialog } from '@angular/material/dialog';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { VideoJuegoServiceService } from 'src/app/services/mtnm/video-juego-service.service';
import { AppComponent } from 'src/app/app.component';
import { EnumService } from '../../../services/mtnm/enum.service';
import { Genero } from 'src/app/models/enum/genero';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { ProductosVenta, ProductosVentaPk } from 'src/app/models/cliente/productos-venta';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { StorageService } from 'src/app/services/medias/storage.service';




@Component({
 
  selector: 'app-videojuegosHome',
  templateUrl: './VideojuegosHome.component.html',
  styleUrls: ['./VideojuegosHome.component.css']
})
export class VideojuegosHome implements OnInit,AfterViewInit {

  @ViewChild("focus") foc: ElementRef;

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
  
  dirImgVj:string="imgVideoJuegos"
  
  constructor(
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService,
    private IndexInstancia:IndexUserComponent,
    private route: ActivatedRoute,
    private el: ElementRef,
    private imgService:StorageService
    
    
  ) {}
  ngOnInit(): void {

    this.listarVideoJuegos();
    this.comboEnums()

   
  }
  ngAfterViewInit(): void {

   this.getParametrosDato();
  
   
   
  }

  getParametrosDato(){

    this.route.params.pipe(
      switchMap(params => {
      var parametro = ""
      parametro = params['plataforma'];
      return parametro
    })
    )
    .subscribe({
      next: (param)=>{
        console.log(param)
        this.SelectionPlata=param
        
        this.VideoJuegoService.listarVideoJuegos().subscribe({
          next:data=>{
            if(data!=undefined){this.tiles=data;}
          },
          complete:()=>{
            console.log(this.SelectionPlata)
            this.resguardo=this.tiles
            this.applyFilter()
          }
        })
      }
      ,
      error: (error)=>{console.log("Error: "+error)}
      ,
      complete:()=>{
        

       
      }
    });

   this.route.params.subscribe(data=>{
      this.SelectionPlata=data['plataforma'];
    })


    
  }

  focus(){
    try {
      setTimeout(() => {
      const invalidControl = this.el.nativeElement.querySelector("#focus");
      console.log(invalidControl)
      invalidControl.focus();
      
      }, 700);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  
  applyFilter() {
    
    this.preloaderTime=true
    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
      this.IndexInstancia.carrusel(false)
    }, 500);
    

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

    
    this.focus()
  }

  clearFilter(){
    this.preloaderTime=true
    setTimeout(() => {
      // Código que se ejecutará después de 2 segundos
      this.preloaderTime=false
    }, 500);
    this.tiles=this.resguardo
    this.Nombrefiltrer=""
    this.SelectionGene=""
    this.SelectionPlata=""
    this.focus()
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
      
      width: '30%',
      height: '75%',
      
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
          this.IndexInstancia.openSnackBar("Agregado: "+this.Pv.nombre,"")
        }
        ///
        
        
        

      } else {}

      this.IndexInstancia.SumaTotal()
    })
  }


  listarVideoJuegos(){
    this.VideoJuegoService.listarVideoJuegos().subscribe({

      next:data=>{
        if(data!=undefined){
          this.tiles=data;
          
        }
      },
      complete:()=>{
        this.resguardo=this.tiles
      }
      
      
    })
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }
   

  
}
