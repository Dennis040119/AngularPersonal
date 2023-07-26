import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent, FormCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoJuegoServiceService } from '../../../services/mtnm/video-juego-service.service';
import { EnumService } from '../../../services/mtnm/enum.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { StorageService } from 'src/app/services/medias/storage.service';



@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css'],
  providers: [NgbCarouselConfig]
})
export class IndexUserComponent implements OnInit,AfterViewInit {

  @ViewChild(MatMenuTrigger) vjmenu: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) vcmenu: MatMenuTrigger;

 


  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;


 boleancarrusel:boolean=true
  
  img:string=""
  //Username
  username:string=localStorage.getItem("user")!
  

  acumulador: number=0
  

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private snackBar:MatSnackBar,
    config: NgbCarouselConfig,
    
    

    private imgService:StorageService
    
    
    
  ){
    config.interval = 2000; // Cambia la imagen cada 2 segundos
    config.wrap = true; // Permite volver al principio al llegar al final
    config.keyboard = false; // Deshabilita la navegación con el teclado
   
  
  }
  
  ngOnInit(): void {
    this.boleancarrusel=true
   
    this.img= this.imgService.getImagen("vj0011689753161906.jpg","vjPortadas")
  }
  ngAfterViewInit(): void {
    this.boleancarrusel=true
    console.log(this.boleancarrusel)
    
  }
 

 


  getSidenav(): boolean {
    return this.Sidenav;
  }
  setSidenav(value: boolean) {
    this.Sidenav = value;
  }

  login(){
    this.router.navigate(['']);
  }

  cuenta(){
    this.boleancarrusel=false
    this.router.navigate(['gamestore/indexUser/UserConfig']);
  }
  home(){
    this.boleancarrusel=true
    this.router.navigate(['gamestore/indexUser']);
  }

  

  DetalleCarritoModal(){

    if(VideojuegosHome.carrito.length>0){
      
      const dialogCrear = this.dialog.open(DetalleCompraComponent, {
      
        width: '1100px',
        height: '600px',
        autoFocus: false,
        
        data: VideojuegosHome.carrito,

      });

      dialogCrear.afterClosed().subscribe(data => {

          console.log(VideojuegosHome.carrito)
          
          this.SumaTotal()
      });
      
    }else{this.openSnackBar("El carrito esta vacio","")}
    
  }
  public SumaTotal(){
    this.acumulador=0;
    VideojuegosHome.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }

  public carrusel(bool:boolean){
    this.boleancarrusel=bool
  }

  

  openMenus(menu:string){
    
     try {
       console.log("this."+menu+".openMenu()")
       eval("this."+menu+".openMenu()");
     } catch (error) {
       console.error('Error al ejecutar el código:', error);
     }
  }

  closeMenus(menu:string){
    try {
      console.log("this."+menu+".closeMenu()")
      eval("this."+menu+".closeMenu()");
    } catch (error) {
      console.error('Error al ejecutar el código:', error);
    }
  }

  pagar(){
    const dialogref =this.dialog.open(FormCompraComponent,{

      width: '45%',
      height: '90%',
      
      autoFocus: false,
      //disableClose: true,
      data: {}
    });
  }

  public openSnackBar(message: string, action: string) {

    var snackBar:MatSnackBar

    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  
  
  }

 



