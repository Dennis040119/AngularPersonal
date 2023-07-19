import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { retry } from 'rxjs';
import { UsuarioService } from 'src/app/services/mtnm/usuario.service';
import { Usuario } from 'src/app/models/mtnm/usuario';

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

  objetoDialog:Usuario=new Usuario;
  tipoDialog:string="";
  dataDialog:any

  checkNewPass:boolean=false

  constructor(
    private dialog: MatDialogRef<ModalUserComponent>,
    private el: ElementRef,
    private UsuarioService:UsuarioService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }

  ngOnInit(): void {

    //Le doy forma al form con sus controls
   this.formgroup();
   const invalidControl = this.el.nativeElement.querySelector('[formControlName="user"]');
   invalidControl.focus();

   //Recibimos la data del modal CrudUsuarios y vemos en que tipo se esta llamando(registrar,editar o detalle)
    this.dataDialog=this.data
    if(this.dataDialog["obj"]!=null){
      this.objetoDialog=this.dataDialog["obj"]
      console.log(this.objetoDialog)
    }else{
      
    }

    this.tipoDialog=this.dataDialog["tipo"]
    if(this.tipoDialog=="edit"){
      
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

  newPassActu():boolean{

    var rpta
    if(this.form.get("Checkpassword")?.value==true){
     rpta = this.form.get("password")?.value==this.form.get("Newpassword")?.value? true:false
     console.log(this.form.get("password")?.value +" : "+this.form.get("Newpassword")?.value)
    }else{ rpta= true;}

    return rpta
   
  }

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
}


