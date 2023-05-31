import { Component,ElementRef,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetalleCompraComponent } from '../detalle-compra/detalle-compra.component';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { Videojuegos } from 'src/app/models/videojuegos';

@Component({
  selector: 'app-form-compra',
  templateUrl: './form-compra.component.html',
  styleUrls: ['./form-compra.component.css']
})
export class FormCompraComponent implements OnInit {

  public form!: FormGroup;
  nombres:string=' ';
  minDate = new Date();
  tiempo: { min: number; sec: number; } = {min:0,sec:0}; 
  
  booNombres:boolean=true;

  constructor(
    private dialogRef: MatDialogRef<FormCompraComponent>,
    private dialogRef2:MatDialog,
    
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }


  ngOnInit(): void {
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombres"]');
    invalidControl.focus();
    this.formGroup();
    this.minDate.setDate(this.minDate.getDate()+1)
    //console.log(this.minDate);
    
    setTimeout(() => {window.confirm("Se acabo el tiempo"),this.dialogRef.close();},300000);
    this.startTimer();

    
  }

  startTimer() {
    this.tiempo = { min: 5, sec: 0 } // choose whatever you want

    this.tiempo.sec.toFixed(2)
    let intervalId = setInterval(() => {
      if (this.tiempo.sec - 1 == -1) {
        this.tiempo.min -= 1;
        this.tiempo.sec = 59
        this.tiempo.sec.toFixed(2)
      } 
      else this.tiempo.sec -= 1
      if (this.tiempo.min === 0 && this.tiempo.sec == 0) clearInterval(intervalId)
    }, 1000)
  }

  
  alertas(){
    this.nombres=this.form.get('nombres')?.value;
    console.log(this.nombres)
     if(this.nombres== (("")||null)){
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

  formValidators(){
    
    this.form.get('nombres')?.setValidators([Validators.required]);
    this.form.get('nombres')?.updateValueAndValidity();

    this.form.get('apellidos')?.setValidators([Validators.required]);
    this.form.get('apellidos')?.updateValueAndValidity();

    this.form.get('tarjeta')?.setValidators([Validators.required,
      Validators.maxLength(16),Validators.minLength(16),Validators.pattern('^[0-9]*$')]);
    this.form.get('tarjeta')?.updateValueAndValidity();

    this.form.get('correo')?.setValidators([Validators.required]);
    this.form.get('correo')?.updateValueAndValidity();

    this.form.get('direccion')?.setValidators([Validators.required]);
    this.form.get('direccion')?.updateValueAndValidity();

    this.form.get('movil')?.setValidators([Validators.required,
      Validators.maxLength(9),Validators.minLength(9),Validators.pattern('^[0-9]*$')]);
    this.form.get('movil')?.updateValueAndValidity();

    this.form.get('fchEntrega')?.setValidators([Validators.required]);
    this.form.get('fchEntrega')?.updateValueAndValidity();
    
  }

  pagar(){
     this.formValidators();


     if(this.form.invalid){
      window.alert("Formulario invalido");

     }else{

      VideojuegosHome.carrito=[];
      window.alert("Compra confirmada")
      this.dialogRef2.closeAll();
     }
   }

}
