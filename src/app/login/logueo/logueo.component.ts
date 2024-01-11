import {Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/mtnm/usuario.service';
import { Router } from '@angular/router';
import { GuardAdmin } from '../../services/utils/guardAdmin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorizacionService } from 'src/app/services/mtnm/autorizacion.service';
import { Usuario, credenciales } from 'src/app/models/mtnm/usuario';
import { HttpHeaders } from '@angular/common/http';
import { guardUserGuard } from 'src/app/services/utils/guard-user.guard';


const tokenBearer = `Bearer ${localStorage.getItem("token")}`;



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

          
           
                /*obtener el token*/
                
                this.authService.login(cred).subscribe({

                  next:(data)=>{
      
                    //Obtenemos los datos del token y lo pones en un localStorage
                    this.dataService=data
                    localStorage.setItem("token",this.dataService.jwt)
                    this.direccionar()
                    if(data!=null){}
                    },  
                    //Mandamos el error en caso las credenciales esten mal u otro error
                  error:(err) => {console.log(err); this.openSnackBar("Credenciales invalidas: ",err.message)},
                  complete: () => {}
                })
              
                
              
              
              }
 
      else{ this.openSnackBar("Faltan Datos","")}
   
  }

  registrar(){

    this.router.navigate(['registro']);

  }


  direccionar(){
    //localStorage.setItem("token","token")
    var usu

    this.usuarioService.BuscarPorUser(this.username).subscribe({

      next:(data)=>{
        if(data!=null){
          console.log(data)
          usu=data

          //Decidimos si es usuario o admin
          if(usu[0].rol=="user"){
            this.guardUser.acces=true
            
            this.router.navigate(['indexUser']);
            console.log("usuario")
      }
          
           //Si es admin se le mandara a la pagina de admin
          if(usu[0].rol=="admin"){
            this.guardAdmin.acces=true
            this.router.navigate(['indexAdmin']);
            console.log("admin")
          }
        
          localStorage.setItem("user",usu[0].username)
          this.openSnackBar("Bienvenido "+usu[0].username,"Accediendo")
      }},
      error:(error)=>{},


    })
    
       
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
