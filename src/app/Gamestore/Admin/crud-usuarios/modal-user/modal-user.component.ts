import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/login/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

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
    }

    if(this.dataDialog["tipo"]=="edit"){
      this.tipoDialog=this.dataDialog["tipo"]
      this.SetActualizaUsuario();
      this.form.get("password")?.disable();
    }
   
    
    
    


   
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

    this.form.get("password")?.setValidators([Validators.required,])
    this.form.get("password")?.updateValueAndValidity();

    this.form.get("email")?.setValidators([Validators.required,
      Validators.pattern("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?")])
    this.form.get("email")?.updateValueAndValidity();

    this.form.get("rol")?.setValidators([Validators.required,])
    this.form.get("rol")?.updateValueAndValidity();


  }
  construirUsuario(){
    this.objTransac.id=0;
    this.objTransac.user=this.form.get("user")?.value
    this.objTransac.password=this.form.get("password")?.value
    this.objTransac.email=this.form.get("email")?.value
    this.objTransac.tarjetaCredito=this.form.get("TarjetaCredito")?.value
    this.objTransac.direccion=this.form.get("direccion")?.value
    this.objTransac.rol=this.form.get("rol")?.value



  }
  SetActualizaUsuario(){
    this.form.get("user")?.setValue(this.objetoDialog.user)
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
      this.form.get("password")?.setValue("123456789")
      }
    
  }

  actualiza() {
      console.log("actuzaliza")
    }
  close() {
     this.dialog.close();
    }
  registar() {

    this.construirUsuario();
    this.ValidControls();
    if(this.form.valid){
      console.log(this.objTransac)

      this.UsuarioService.registrar(this.objTransac).subscribe((data) => {
        this.dataService=data
        if(this.dataService['mensaje']=="Registrado usuario correctamente"){
          window.alert(this.dataService['mensaje'])
          this.dialog.close();
        }else{window.alert(this.dataService['mensaje'])}
      })
    }else{

    }
      
    
    }
}


