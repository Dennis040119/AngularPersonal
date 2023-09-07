import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { StorageService } from 'src/app/services/medias/storage.service';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { LogueoComponent } from '../logueo/logueo.component';
import { Router } from '@angular/router';
import { Guard } from 'src/app/services/utils/guard';
import { any } from 'prop-types';
import { combineLatest } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  @ViewChild('fileInput') fileInput: any;

  public form!: FormGroup;

  objTransacc:Usuario=new Usuario()

  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

  data:any

  //contraseñaNueva
  rpta:boolean=false

  //Servicio de imagenes
  fileToUpload: File;

constructor(
  private imgService:StorageService,
  private formBuilder: FormBuilder,
  private userService:UsuarioService,
  private appCom:AppComponent,
  private router:Router,
  
){

}

ngOnInit(): void {
  this.formGroup()
  this.validators()
 

 
}

formGroup(){
  this.form = this.formBuilder.group({
    username: [],
    password: [],
    newpassword: [],
    email:[],
    tarjetaCredito:[],
    direccion:[],
    

  })
}
  
validators(){
    this.form.get('username')?.setValidators([Validators.required]);
    this.form.get('nombre')?.updateValueAndValidity();

    this.form.get('password')?.setValidators([Validators.required]);
    this.form.get('password')?.updateValueAndValidity();

    this.form.get('newpassword')?.setValidators([Validators.required]);
    this.form.get('newpassword')?.updateValueAndValidity();

    this.form.get("email")?.setValidators([Validators.required,
      Validators.pattern("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?")])
    this.form.get("email")?.updateValueAndValidity();
   
    this.form.get('imagen')?.setValidators([Validators.required]);
    this.form.get('imagen')?.updateValueAndValidity();


    

    
    
}
registrar(){

  if(this.form.valid && (this.form.get("password")?.value==this.form.get("newpassword")?.value) ){


    if (!this.fileToUpload) {
      this.appCom.openSnackBar("Seleccionar una imagen","")
      return;
    }

    this.construirrobj();
    var idUser:string=""


    this.userService.listarUsuarios().subscribe(data => {
      this.data=data;
      idUser="us0"+(this.data.length+1)



    
    this.imgService.storeFile(this.fileToUpload,idUser,"userImage").subscribe({
    
      next:(data1)=>{
        this.data=data1
        console.log(data1)
        if(this.data["url"]!=""){
        this.objTransacc.imagen=this.data["url"]

        this.userService.registrar(this.objTransacc).subscribe({
          next:(data)=>{
            this.data=data
            this.appCom.openSnackBar(this.data["mensaje"],"")
          },
          error:(err)=>{
    
          },
          complete:()=> {
            
          }
        });

        }
      },
      error:(err)=>{},
      complete:()=>{
        Guard.roles="user"
        localStorage.setItem("key","true")
        localStorage.setItem("user",this.objTransacc.username)
        this.router.navigate(['indexUser']);
      }
    });

    });

    
  }
}

construirrobj(){
  
  this.objTransacc.userid="";
  this.objTransacc.username=this.form.get("username")?.value

    ////Pass cuando edita
   this.objTransacc.password=this.form.get("password")?.value

    
    this.objTransacc.email=this.form.get("email")?.value
    this.objTransacc.tarjetaCredito=this.form.get("tarjetaCredito")?.value
    this.objTransacc.direccion=this.form.get("direccion")?.value
    this.objTransacc.rol="user"
    this.objTransacc.estado="ac"
    
}

login(){
  this.router.navigate(['login']);
}
  
onlyNumbers(event:any): boolean {
    const charChode = event.which ? event.which : event.keyCode;
    if (charChode == '46') {
      return true;
    }

    if (charChode > 31 && (charChode < 48 || charChode > 57)) {
      return false;
    }

    return true;
  }
handleFileInput(event: Event) {
    
    const files = (event.target as HTMLInputElement).files!;
    this.fileToUpload = files.item(0)!;

  }

  
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    
    this.getURLFromFile(this.selectedFile)
    
  }

  getURLFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileUrl = e.target.result;
      this.selectedFileName = this.selectedFile.name;
    };
    reader.readAsDataURL(file);
    
  }

  
  


}
