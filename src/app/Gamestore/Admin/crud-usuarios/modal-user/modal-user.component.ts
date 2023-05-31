import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


