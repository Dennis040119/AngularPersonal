import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoJuegoServiceService } from '../../Admin/services/video-juego-service.service';
import { EnumService } from '../../Admin/services/enum.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LogueoComponent } from 'src/app/login/logueo/logueo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

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
  

  //Username
  username:string=localStorage.getItem("user")!
  

  acumulador: number=0
  

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService,
    private snackBar:MatSnackBar,
    config: NgbCarouselConfig,
    
    
    
  ){
    config.interval = 2000; // Cambia la imagen cada 2 segundos
    config.wrap = true; // Permite volver al principio al llegar al final
    config.keyboard = false; // Deshabilita la navegación con el teclado
   
  
  }
  
  ngOnInit(): void {
    this.boleancarrusel=true
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  openMenus(menu:string){
    this.vcmenu.openMenu()
    // try {
    //   console.log("this."+menu+".openMenu()")
    //   eval("this."+menu+".openMenu()");
    // } catch (error) {
    //   console.error('Error al ejecutar el código:', error);
    // }
  }

  closeMenus(menu:string){
    try {
      console.log("this."+menu+".closeMenu()")
      eval("this."+menu+".closeMenu()");
    } catch (error) {
      console.error('Error al ejecutar el código:', error);
    }
  }
}


