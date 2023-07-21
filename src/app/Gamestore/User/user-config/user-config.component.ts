import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { StorageService } from 'src/app/services/medias/storage.service';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { IndexAdminComponent } from '../../Admin/index-admin/index-admin.component';
import { IndexUserComponent } from '../index-user/index-user.component';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;

  public form!: FormGroup;

  objRecepcion:Usuario

  tipoDialog:string="";
  checkNewPass:boolean=false

  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

  //Servicio de imagenes
  fileToUpload: File;
   dirImgVj:string="imgVideojuegos"
   constructor(
    private imgService:StorageService,
    private formBuilder: FormBuilder,
    private userService:UsuarioService,
    private IndexUser:IndexUserComponent
   ){}
  ngOnInit(): void {
    this.formGroup()
    this.getDatosUsuario()

    
  }

  formGroup(){
    this.form = this.formBuilder.group({
      username: [],
      password: [],
      newpassword: [],
      email:[],
      tarjetaCredito:[],
      direccion:[],
      Checkpassword:[],
      
      
      imagen:[]

    })

    this.form.get("password")?.disable()

  }

  checkPass(){
    this.checkNewPass=this.form.get("Checkpassword")?.value
    if(this.checkNewPass==true){
      this.form.get("password")?.enable();
      this.form.get("password")?.setValue("")
    }else{this.form.get("password")?.disable();
      if(this.form.get("password")?.value != undefined){this.form.get("password")?.setValue("123456789")}
      else{this.form.get("password")?.setValue("")}
      
      }
    
  }

  getDatosUsuario(){
    this.userService.BuscarPorUser(localStorage.getItem("user")!).subscribe({
      next:(data)=>{
        console.log(data[0])
        this.objRecepcion=data[0]
      },
      error:(data)=>{
        
      },
      complete:()=>{
        this.setFormObj()
        this.IndexUser.openSnackBar("hola : "+this.objRecepcion.username,"")
      }
    })
  }

  setFormObj(){
    this.form.get("username")?.setValue(this.objRecepcion.username)
    this.form.get("password")?.setValue(this.objRecepcion.username)

    this.form.get("email")?.setValue(this.objRecepcion.email) 
    this.form.get("tarjetaCredito")?.setValue(this.objRecepcion.tarjetaCredito)
    this.form.get("direccion")?.setValue(this.objRecepcion.direccion)
   


    
  }

  actualizar(){

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
    console.log(files.item(0)?.name)
    this.fileToUpload = files.item(0)!;

    console.log(this.fileToUpload)
  }

  uploadFile(id:string,dir:string) {
    if (!this.fileToUpload) {
      console.error('Debe seleccionar un archivo, un id y un tipo de archivo.');
      return;
    }

    this.imgService.storeFile(this.fileToUpload, id, dir).subscribe({
      next:data=>{
        console.log(data)
      },
      error:data=>{
        console.log(data)
      }
    })
      
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
