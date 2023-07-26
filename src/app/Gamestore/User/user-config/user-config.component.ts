import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { StorageService } from 'src/app/services/medias/storage.service';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { IndexAdminComponent } from '../../Admin/index-admin/index-admin.component';
import { IndexUserComponent } from '../index-user/index-user.component';
import { EnumService } from 'src/app/services/mtnm/enum.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;

  public form!: FormGroup;

  objRecepcion:Usuario
  objTransacc:Usuario=new Usuario()

  tipoDialog:string="";
  checkNewPass:boolean=false

  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

  data:any

  //contraseñaNueva
  rpta:boolean=false

  //Servicio de imagenes
  fileToUpload: File;
   dirImgVj:string="userImage"
   constructor(
    private imgService:StorageService,
    private formBuilder: FormBuilder,
    private userService:UsuarioService,
    private IndexUser:IndexUserComponent,
    private enumservice:EnumService,
    private storageService:StorageService
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
    this.form.get("Checkpassword")?.setValue(false)
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
        this.objRecepcion=data[0]
        this.selectedFileUrl=this.getimagen(this.objRecepcion.imagen)
        this.selectedFileName=this.getimagen(this.objRecepcion.imagen)
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
   

    //Operamos para poder cargar la imagen que le corresponde 
    
    this.selectedFileUrl=this.getimagen(this.objRecepcion.imagen)

    var patron: RegExp = /us.*\.jpg/;
    var texto:string = ""

    if(this.getimagen(this.objRecepcion.imagen).match(patron) !=null){
      texto=this.getimagen(this.objRecepcion.imagen).match(patron)!.toString()!
    }
    this.selectedFileName = texto

    //

    this.setImagen();
    
  }

  ConstruirObj(){

        this.objTransacc.userid=this.objRecepcion.userid
        this.objTransacc.username=this.form.get("username")?.value
        this.objTransacc.direccion=this.form.get("direccion")?.value
        this.objTransacc.email=this.form.get("email")?.value
        this.objTransacc.tarjetaCredito=this.form.get("tarjetaCredito")?.value

        ////Pass cuando esta marcado el checkbox
       
       

        this.objTransacc.rol="user"
        this.objTransacc.estado="ac"

        console.log(this.objTransacc)
    
    
  }

  actualizar(){
    this.newPassActu()

    setTimeout(() => {
      if(this.form.valid && this.rpta){

        this.ConstruirObj()
  
        if (!this.fileToUpload) {
          this.IndexUser.openSnackBar('Debe seleccionar un archivo, un id y un tipo de archivo.',"");
          return;
        }

        if(this.rpta==true && this.form.get("Checkpassword")?.value==true){
          this.objTransacc.password=this.form.get("newpassword")?.value
        }

        if(this.form.get("Checkpassword")?.value==false){
          this.objTransacc.password=this.form.get("password")?.value
        }
    
        if(this.objTransacc.userid!= undefined ||null){
          this.imgService.storeFile(this.fileToUpload, this.objTransacc.userid, "userImage").subscribe({
            next:data1=>{
              this.data=data1
                  if(this.data["url"]!=""){
    
                    this.storageService.deleteImagen(this.objRecepcion.imagen,"userImage").subscribe(data=>{
                    
                    })

                    this.objTransacc.imagen=this.data["url"]
                    this.userService.actualizar(this.objTransacc).subscribe({
                      next:data2=>{
                        this.data=data2
                        if(this.data['mensaje']=="Actualizado usuario correctamente"){
                          this.IndexUser.openSnackBar(this.data['mensaje'],"")
                          
                        }else{this.IndexUser.openSnackBar(this.data['mensaje'],"")}
    
                      },
                      error:(error)=>{
                        this.IndexUser.openSnackBar("Error al actualizar usuario","")
                        console.log("Error actualizar user: "+error)
                      }
                    })
                    
                  }else{}
            },
            error:error=>{
              console.log("Error registrar imagen: "+error)
            }
          })
        }else{
          console.log(this.objTransacc.userid)
        }
        
  
      }else{
        if(this.form.invalid){
          this.IndexUser.openSnackBar("Formulario Invalido","");
        }else{this.IndexUser.openSnackBar("La antigua contraseña es erronea","");}
        
      }
    }, 600);
    

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

  setImagen() {
    const imageUrl = this.getimagen(this.objRecepcion.imagen); // Reemplaza esta URL con la URL de la imagen que deseas descargar

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        this.fileToUpload = new File([blob], this.selectedFileName, { type: 'image/jpg' });
        
      })
      .catch(error => {
        console.error('Error loading file:', error);
      });
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

  newPassActu(){

    
    if(this.form.get("Checkpassword")?.value==true){
      
      this.enumservice.desescryp(this.form.get("password")?.value,this.objRecepcion.password).subscribe({
        next:(data)=>{

           this.rpta=data
           
           
        },
        error:(error)=>{

        },
        complete:()=>{
         
        }
      })
    
    }else{ this.rpta= true;
    }

    
   
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }
  

}
