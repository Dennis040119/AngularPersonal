import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { StorageService } from 'src/app/services/medias/storage.service';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { LogueoComponent } from '../logueo/logueo.component';
import { Router } from '@angular/router';
import { Guard } from 'src/app/services/utils/guard';

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
  private router:Router,
  
){

}

ngOnInit(): void {
  this.formGroup()
 

 
}

formGroup(){
  this.form = this.formBuilder.group({
    username: [],
    password: [],
    newpassword: [],
    email:[],
    tarjetaCredito:[],
    direccion:[],
    imagen:[]

  })

  
}
registrar(){

  if(this.form.valid){
    Guard.roles="user"
    localStorage.setItem("key","true")
    localStorage.setItem("user","user")
    this.router.navigate(['gamestore/indexUser']);
  }
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
