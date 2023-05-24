import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plataforma } from 'src/app/models/plataforma';
import { Videojuegos } from 'src/app/models/videojuegos';
import { VideoJuegoServiceService } from 'src/app/services/video-juego-service.service';

@Component({
  selector: 'app-modal-vj',
  templateUrl: './modal-vj.component.html',
  styleUrls: ['./modal-vj.component.css']
})
export class ModalVjComponent implements OnInit {

  public form!: FormGroup;
  nombres:string=' ';
  booNombres:boolean=true;
  srcResult: any;
  plataformas: Plataforma[]=[]
  objRegistrar:Videojuegos = new Videojuegos;

  constructor(
    private dialog: MatDialogRef<ModalVjComponent>,
    private el: ElementRef,
    private vjService:VideoJuegoServiceService,
    
    
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }
  ngOnInit(): void {
    this.formGroup();
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombre"]');
    invalidControl.focus();
    this.comboPLataforma1();
    
  }

  formGroup(){
    this.form = this.formBuilder.group({
      nombre: [],
      precio: [],
      descripcion:[],
      plataforma1:[],
      plataforma2:[],
      plataforma3:[],
      img:[],
      color:[]
      
    })
  }

  close(){this.dialog.close();}

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

  alertas(){
    this.nombres=this.form.get('nombres')?.value;
    console.log(this.nombres)
     if(this.nombres== (("")||null)){
        this.booNombres=false
     }else{this.booNombres=true}
  }

  registar(){
    this.formValidators();


     if(this.form.invalid){
      window.alert("Formulario invalido");

     }else{

      try {
        this.constructorObj()
        this.vjService.registrarVj(this.objRegistrar).subscribe((data)=>{
          this.data=data
          console.log(data)
          if( this.data["mensaje"] == "Registrado correctamente"){
            this.close();
          }
        })
      } catch (error) {
        window.alert("Error al registrar: "+error)
      }
      
      
      
     }
   
  }

  constructorObj() {
    this.objRegistrar.id=0
    this.objRegistrar.rol="vj"
    this.objRegistrar.nombre=this.form.get("nombre")?.value
    this.objRegistrar.precio=this.form.get("precio")?.value
    this.objRegistrar.color=this.form.get("color")?.value
    this.objRegistrar.img=this.form.get("img")?.value
    this.objRegistrar.descripcion=this.form.get("descripcion")?.value
    this.objRegistrar.plataforma1=this.form.get("plataforma1")?.value
    this.objRegistrar.plataforma2=this.form.get("plataforma2")?.value
    this.objRegistrar.plataforma3=this.form.get("plataforma3")?.value

  }
  

  comboPLataforma1(){
    this.plataformas.push(new Plataforma("PC","Microsoft",5))
    this.plataformas.push(new Plataforma("Play Station 4","Sony",4))
    this.plataformas.push(new Plataforma("Play Station 5","Sony",5))
    this.plataformas.push(new Plataforma("Xbox 360","Microsoft",4))
    this.plataformas.push(new Plataforma("Xbox One","Microsoft",5))
    this.plataformas.push(new Plataforma("Nintendo Switch","Nintendo",5))
  }

  formValidators(){
    
    this.form.get('nombre')?.setValidators([Validators.required]);
    this.form.get('nombre')?.updateValueAndValidity();

    this.form.get('img')?.setValidators([Validators.required]);
    this.form.get('img')?.updateValueAndValidity();

    this.form.get('precio')?.setValidators([Validators.required,
    Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]);
    this.form.get('precio')?.updateValueAndValidity();

    this.form.get('color')?.setValidators([Validators.required]);
    this.form.get('color')?.updateValueAndValidity();

    this.form.get('plataforma1')?.setValidators([Validators.required]);
    this.form.get('plataforma1')?.updateValueAndValidity();

  }
}
