import {Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/mtnm/usuario.service';
import { Router } from '@angular/router';
import { GuardAdmin } from '../../services/utils/guardAdmin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorizacionService } from 'src/app/services/mtnm/autorizacion.service';
import { credenciales } from 'src/app/models/mtnm/usuario';
import { HttpHeaders } from '@angular/common/http';
import { guardUserGuard } from 'src/app/services/utils/guard-user.guard';


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
    private snackBar:MatSnackBar,
    private guardUser:guardUserGuard,
    private guardAdmin:GuardAdmin
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    
  }

  login() {
    
   if((this.username && this.password) !=("" && undefined)){

          //Colocamos los campos en una variable de tipo credenciales para mandarle al servicio que generara el token
          var cred:credenciales= new credenciales
          cred.username=this.username
          cred.password=this.password
          this.authService.login(cred).subscribe({

            next:(data)=>{

              //Obtenemos los datos del token y lo pones en un localStorage
              this.dataService=data
              localStorage.setItem("token",this.dataService.jwt)
              
              if(data!=null){
                console.log(data)
                this.direccionar()
              }
              
              
                

              },  
              //Mandamos el error en caso las credenciales esten mal u otro error
            error:(err) => {console.log(err); this.openSnackBar("Credenciales invalidas: ","")},
            complete: () => {
              /////Buscamos el usuario para obtener sus datos
             
            }
          })

      }else{ this.openSnackBar("Faltan Datos","")}
   
  }

  registrar(){

    this.router.navigate(['registro']);

  }


  direccionar(){
   
    var direccion=""



      this.usuarioService.BuscarPorUser(this.username).subscribe({

        next:(data) => {//Si es usuario se le mandara a la pagina de usuarios
          if(data[0].rol=="ROLE_USER"){
            this.guardUser.acces=true
            direccion='indexUser'
             }
          
           //Si es admin se le mandara a la pagina de admin
          if(data[0].rol=="ROLE_ADMIN"){
            this.guardAdmin.acces=true
            direccion='indexAdmin'
          }
        
          localStorage.setItem("user",data[0].username)
          this.router.navigate([direccion]);
          this.openSnackBar("Bienvenido "+data[0].username,"Accediendo")

        },

        
        error:(err) => {console.log(err)},
        complete: () => {
          
         
        }

            
        
      })
    
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
