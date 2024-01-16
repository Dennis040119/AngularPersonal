import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { retry } from 'rxjs';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { Usuario } from 'src/app/models/mtnm/usuario';
import { StorageService } from 'src/app/services/medias/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

///Material


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {


   public form!: FormGroup;
   objTransac: Usuario = new Usuario;
   dataService:any

  //Datos que recibimos de crudUsuarios
  objetoDialog:Usuario=new Usuario;
  tipoDialog:string="";
  dataDialog:any

  //Controlador del check de contraseña
  checkNewPass:boolean=false


  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

  //Servicio de imagenes
  fileToUpload: File;
  dirImgVj:string="userImage"

  constructor(
    private dialog: MatDialogRef<ModalUserComponent>,
    private el: ElementRef,
    private UsuarioService:UsuarioService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private imgService:StorageService,
    private snackBar:MatSnackBar,

    


  ) { }

  ngOnInit(): void {

    //Le doy forma al form con sus controls
   this.formgroup();
   const invalidControl = this.el.nativeElement.querySelector('[formControlName="user"]');
   invalidControl.focus();

   //Recibimos la data del modal CrudUsuarios y vemos en que tipo se esta llamando(registrar,editar o detalle)
    if(this.data!=(undefined||null)){
      this.dataDialog=this.data
    }
    
    if(this.dataDialog["obj"]!=null){
      this.objetoDialog=this.dataDialog["obj"]
      console.log(this.objetoDialog)
    }else{
      
    }

    this.tipoDialog=this.dataDialog["tipo"]
    if(this.tipoDialog.includes("edit")||this.tipoDialog.includes("view")){
     
      this.SetActualizaUsuario();
      this.form.get("password")?.disable();
    }
   
    
    console.log(this.tipoDialog)
    


   
  }

  formgroup(){
  this.form = this.formBuilder.group({
    user: [],
    password: [],
    Checkpassword:false,
    Newpassword: [],
    email:[],
    TarjetaCredito:[],
    direccion:[],
    rol:[],
    
    
  })
  
  }
  ValidControls(){
    this.form.get("user")?.setValidators([Validators.required,])
    this.form.get("user")?.updateValueAndValidity();

    if(this.tipoDialog=="edit" && this.checkNewPass){
      this.form.get("password")?.setValidators([Validators.required,])
      this.form.get("password")?.updateValueAndValidity();

      this.form.get("Newpassword")?.setValidators([Validators.required])
      this.form.get("Newpassword")?.updateValueAndValidity();

      
    }

    if(this.tipoDialog=="registrar"){
      this.form.get("password")?.setValidators([Validators.required,])
      this.form.get("password")?.updateValueAndValidity();

      this.form.get("Newpassword")?.setValidators([Validators.required])
      this.form.get("Newpassword")?.updateValueAndValidity();
    }
    

    this.form.get("email")?.setValidators([Validators.required,
      Validators.pattern("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?")])
    this.form.get("email")?.updateValueAndValidity();

    this.form.get("rol")?.setValidators([Validators.required,])
    this.form.get("rol")?.updateValueAndValidity();


  }
  construirUsuario(){
    this.objTransac.userid="";
    this.objTransac.username=this.form.get("user")?.value

    ////Pass cuando edita
    if(this.tipoDialog=="edit" && !this.checkNewPass){this.objTransac.password=this.objetoDialog.password}
    else{this.objTransac.password=this.form.get("password")?.value}

    
    this.objTransac.email=this.form.get("email")?.value
    this.objTransac.tarjetaCredito=this.form.get("TarjetaCredito")?.value
    this.objTransac.direccion=this.form.get("direccion")?.value
    this.objTransac.rol=this.form.get("rol")?.value
    this.objTransac.estado="ac"


  }
  SetActualizaUsuario(){
    this.form.get("user")?.setValue(this.objetoDialog.username)
    this.form.get("password")?.setValue("123456789")
    this.form.get("email")?.setValue(this.objetoDialog.email)
    this.form.get("TarjetaCredito")?.setValue(this.objetoDialog.tarjetaCredito)
    this.form.get("direccion")?.setValue(this.objetoDialog.direccion)
    this.form.get("rol")?.setValue(this.objetoDialog.rol)
    

    this.selectedFileUrl=this.getimagen(this.objetoDialog.imagen)
    var patron: RegExp = /vj.*\.jpg/;
    var texto:string = ""
    if(this.getimagen(this.objetoDialog.imagen).match(patron) !=null){
      texto=this.getimagen(this.objetoDialog.imagen).match(patron)!.toString()!
    }
    
    
    this.selectedFileName = texto
    //////////////////////////////////////////////////
  }

  //Metodo para bloquear el tipiado de numeros en un input
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

  checkPass(){
    
    this.checkNewPass=this.form.get("Checkpassword")?.value
    if(this.checkNewPass==true && this.tipoDialog=="edit"){
      this.form.get("password")?.enable();
      this.form.get("password")?.setValue("")
    }else{
      this.form.get("password")?.disable();
      if(this.form.get("password")?.value != undefined){console.log("checkpass")
        this.form.get("password")?.setValue("123456789")}
      else{this.form.get("password")?.setValue("")}
      
      }
    
  }

  newPassActu():boolean{

    var rpta
    if(this.form.get("Checkpassword")?.value==true){
     rpta = this.form.get("password")?.value==this.form.get("Newpassword")?.value? true:false
     console.log(this.form.get("password")?.value +" : "+this.form.get("Newpassword")?.value)
    }else{ rpta= true;
        this.objTransac.password="null";
    }

    return rpta
   
  }

  //Metodos transaccionales
  operacion(){
    this.tipoDialog=='registrar'? this.registar():this.actualiza()  
  }

  actualiza() {
    console.log("actualiza")
    this.construirUsuario();
    this.ValidControls();
    if(this.form.valid && this.newPassActu()){
      console.log(this.objTransac)
      this.objTransac.userid=this.objetoDialog.userid
      this.UsuarioService.actualizar(this.objTransac).subscribe((data) => {
        this.dataService=data
        if(this.dataService['mensaje']=="Actualizado usuario correctamente"){
          window.alert(this.dataService['mensaje'])
          this.dialog.close();
        }else{window.alert(this.dataService['mensaje'])}
      })
    }else{ this.form.valid? window.alert("Ambas contraseñas deben ser iguales"):window.alert("Formulario no valido")}


    }
  close() {
     this.dialog.close();
    }
  registar() {
    console.log("registra")
    this.construirUsuario();
    this.ValidControls();
    if(this.form.valid && this.form.get("Newpassword")?.value== this.objTransac.password){
      console.log(this.objTransac)

      this.UsuarioService.registrar(this.objTransac).subscribe((data) => {
        this.dataService=data
        if(this.dataService['mensaje']=="Registrado usuario correctamente"){
          window.alert(this.dataService['mensaje'])
          this.dialog.close();
        }else{window.alert(this.dataService['mensaje'])}
      })
    }else{ this.form.valid? window.alert("Ambas contraseñas deben ser iguales"):window.alert("Formulario no valido")}
      
    
  }


 //Metodos para cargar la imagen y subirla a la BBDD
  handleFileInput(event: Event) {
    
    const files = (event.target as HTMLInputElement).files!;
    console.log(files.item(0)?.name)
    this.fileToUpload = files.item(0)!;

    console.log(this.fileToUpload)
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

}


