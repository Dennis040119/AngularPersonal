import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoJuegoServiceService } from '../../Admin/services/video-juego-service.service';
import { EnumService } from '../../Admin/services/enum.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css'],
  providers: [NgbCarouselConfig]
})
export class IndexUserComponent {

  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;

  images = [
    'url_de_imagen_1',
    'url_de_imagen_2',
    'url_de_imagen_3',
    // Agrega más imágenes según sea necesario
  ];

  //Username
  username:string=localStorage.getItem("user")!
  

  acumulador: number=0

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService,
    config: NgbCarouselConfig
    
    
  ){
    config.interval = 2000; // Cambia la imagen cada 2 segundos
    config.wrap = true; // Permite volver al principio al llegar al final
    config.keyboard = false; // Deshabilita la navegación con el teclado
  
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
      
    }else{window.alert("El carrito esta vacio");}
    
  }
  public SumaTotal(){
    this.acumulador=0;
    VideojuegosHome.carrito.forEach(element => {
      this.acumulador=(this.acumulador+element.precio);
      
    });
    ;
    console.log(this.acumulador.toFixed(2));
   

  }


}
