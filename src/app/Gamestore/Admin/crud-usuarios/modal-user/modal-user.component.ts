import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pattern } from '@mui/icons-material';
import { UsuarioService } from 'src/app/login/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {


   public form!: FormGroup;
   objTransac: Usuario = new Usuario;
   dataService:any

  constructor(
    private dialog: MatDialogRef<ModalUserComponent>,
    private el: ElementRef,
    private UsuarioService:UsuarioService,
    
    
    
    
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }

  ngOnInit(): void {
   this.formgroup();
   const invalidControl = this.el.nativeElement.querySelector('[formControlName="user"]');
   invalidControl.focus();
  }

  formgroup(){
  this.form = this.formBuilder.group({
    user: [],
    password: [],
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


