import {CommonModule } from '@angular/common';
import {Component, NgModule, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Route, Router } from '@angular/router';
import { Guard } from '../services/guard';



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
        localStorage.setItem("user",data[0].user)
        

        if(data[0].rol=="user"){
          Guard.roles="user"
          window.alert("Bienvenido usuario: ");
          this.router.navigate(['gamestore/indexUser']);
          console.log(Guard.roles)
        }

        if(data[0].rol=="admin"){
          Guard.roles="admin"
          window.alert("Bienvenido administrador: ");
          this.router.navigate(['gamestore/indexAdmin']);
          console.log(Guard.roles)
        }
        
        
        
        
        }else{
        localStorage.setItem("key","false")
        window.alert("Contraseña incorrecta: ");
        }
      
        });
    /////////////////
      }else{window.alert("Usuario no registrado: ");}




      console.log(Guard.roles)

    })


   
   }else{ window.alert("Faltan datos")}
   
  }
}
