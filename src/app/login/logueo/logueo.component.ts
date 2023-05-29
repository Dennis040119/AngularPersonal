import {CommonModule } from '@angular/common';
import {Component, NgModule, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css'],
})


export class LogueoComponent implements OnInit {
  email: string="";
  password: string=""
  
  
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    
  }

  login() {
    
   if((this.email && this.password) !=("" && undefined)){

    this.usuarioService.BuscarPorUser(this.email).subscribe(data =>{
      //////////////////////
      if(data.length==1){
         /////////////
        this.usuarioService.buscarLogin(this.email,this.password).subscribe(data=>{
        if(data.length==1){
        localStorage.setItem("key","true")
        window.alert("Bienvenido: ");

        if(data[0].rol=="user"){
          this.router.navigate(['gamestore']);
        }

        if(data[0].rol=="admin"){
          this.router.navigate(['CrudVj']);
        }
        
        
        
        
        }else{
        localStorage.setItem("key","false")
        window.alert("Contraseña incorrecta: ");
        }
      
        });
    /////////////////
      }else{window.alert("Usuario no registrado: ");}






    })


   
   }else{ window.alert("Faltan datos")}
   
  }
}
