import {Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/mtnm/usuario.service';
import { Router } from '@angular/router';
import { Guard } from '../../services/utils/guard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorizacionService } from 'src/app/services/mtnm/autorizacion.service';
import { credenciales } from 'src/app/models/mtnm/usuario';
import { HttpHeaders } from '@angular/common/http';


const tokenBearer = `Bearer ${localStorage.getItem("token")}`;

export const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': tokenBearer
  })
};


@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css'],
})


export class LogueoComponent implements OnInit {
  username: string="";
  password: string=""

  dataService:any
  
  
  constructor(
    private usuarioService:UsuarioService,
    private authService:AutorizacionService,
    private router:Router,
    private  snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    
  }

  login() {
    
   if((this.username && this.password) !=("" && undefined)){

    this.usuarioService.BuscarPorUser(this.username).subscribe(data =>{
      //////////////////////
      if(data.length==1){
         /////////////
        this.usuarioService.buscarLogin(this.username,this.password).subscribe(data=>{

          var cred:credenciales= new credenciales
          cred.username=this.username
          cred.password=this.password
          this.authService.login(cred).subscribe(data=>{

            this.dataService=data
            console.log(this.dataService.jwt);
            localStorage.setItem("token",this.dataService.jwt)
          })

          console.log(data)
        if(data.length==1){
        localStorage.setItem("key","true")
        localStorage.setItem("user",data[0].username)
        

        if(data[0].rol=="ROLE_USER"){
          Guard.roles="user"
          this.openSnackBar("Bienvenido "+data[0].username,"Accediendo")
          this.router.navigate(['indexUser']);
          console.log(Guard.roles)
        }

        if(data[0].rol=="ROLE_ADMIN"){
          Guard.roles="admin"
          this.openSnackBar("Bienvenido "+data[0].username,"Accediendo")
          this.router.navigate(['indexAdmin']);
          console.log(Guard.roles)
        }
        
        
        
        
        }else{
        localStorage.setItem("key","false")
        this.openSnackBar("Contraseña Incorrecta","Denegada")
        }
      
        });
    /////////////////
      }else{this.openSnackBar("Usuario no registrado","Denegada");}




      console.log(Guard.roles)
      

    })


   
   }else{ this.openSnackBar("Faltan Datos","")}
   
  }

  registrar(){

    this.router.navigate(['registro']);

  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
