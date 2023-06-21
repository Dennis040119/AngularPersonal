import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VideojuegosHome } from '../VideoJuegosHome/VideoJuegosHome.component';
import { DetalleCompraComponent } from '../modal_juego/detalle-compra/detalle-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoJuegoServiceService } from '../../Admin/services/video-juego-service.service';
import { EnumService } from '../../Admin/services/enum.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent {

  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;

  //Username
  username:string=localStorage.getItem("user")!
  

  acumulador: number=0

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private VideoJuegoService:VideoJuegoServiceService,
    private EnumService:EnumService
    
  ){

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
