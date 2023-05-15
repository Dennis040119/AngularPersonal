import { Component, Inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Elemento } from '../../models/elemento';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public form!: FormGroup;
  nombre?:string;
  peso?:number;
  simbolo?:string;
  e:Elemento=new Elemento(0,"",0,"");
  tipo?:number;
  nuevo?:Elemento;
  
  

  constructor(
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }

  ngOnInit(): void {
    //Obtengo los datos que me envia el componente tabla(el elemento selecionado)
    this.e ={...this.data['objeto']};
    this.tipo = this.data['tipo'];
    console.log(this.e);

    //Seteo los datos obtenidos en el model, creo el formgroup y bloqueo los inputs
    this.detallar();
    this.formGroup();
    if(this.tipo==1){
      this.disablear();
    }
    
    
    
    
    
  }
  cerrar() {
    this.dialogRef.close();
  }

  agregar(){

    console.log(this.form.get("nombre")?.value)

    if(this.form.get('nombre')?.value!=undefined && 
      this.form.get('peso')?.value!=undefined && 
    this.form.get('simbolo')?.value!=undefined)
    {
      
       this.nuevo= new Elemento (10,this.form.get('nombre')?.value,this.form.get('peso')?.value,
      this.form.get('simbolo')?.value);
      this.dialogRef.close(this.nuevo);

    
    }else{
      window.alert("Faltan datos")
    }
    
  }

  editar(){
    
  }

  detallar(){
    this.nombre=this.e.nombre
    this.peso=this.e.peso
    this.simbolo=this.e.simbolo
    
    //console.log(this.form.get('nombre'))
      
  }

  formGroup(){
    this.form = this.formBuilder.group({
      nombre: [this.e.nombre],
      peso: [this.e.peso],
      simbolo: [this.e.simbolo],
      
    })
  }

  disablear(){
    this.form.get('nombre')?.disable();
    this.form.get('peso')?.disable();
    this.form.get('simbolo')?.disable();
  }

}
