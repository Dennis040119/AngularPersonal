import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DetalleCompraComponent } from '../detalle-compra/detalle-compra.component';

@Component({
  selector: 'app-form-compra',
  templateUrl: './form-compra.component.html',
  styleUrls: ['./form-compra.component.css']
})
export class FormCompraComponent implements OnInit {

  form!: FormGroup;
  nombres:string=' ';
  booNombres:boolean=true;

  constructor(
    private dialogRef: MatDialogRef<FormCompraComponent>,
    private dialogRef2: MatDialogRef<DetalleCompraComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }


  ngOnInit(): void {
    this.formGroup();

  }

  
  alertas(){
    this.nombres=this.form.get('nombres')?.value;
    if(this.nombres== ("")||null){
        this.booNombres=false
    }else{this.booNombres=true}
  }

  formGroup(){
    this.form = this.formBuilder.group({
      nombres: [],
      apellidos: [],
      tarjeta: [],
      correo:[],
      direccion:[],
      movil:[],
      fchEntrega:[]
      
    })
  }

  close(){
    this.dialogRef.close();
    this.dialogRef2.close();
    
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

}
