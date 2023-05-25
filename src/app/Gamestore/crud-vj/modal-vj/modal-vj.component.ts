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

  //Variables del metodo alertas()
  nombres:string=' ';
  booNombres:boolean=true;
  srcResult: any;

  ///Arrays combobox
  plataformas: Plataforma[]=[]
  plataformas2: Plataforma[]=[]
  plataformas3: Plataforma[]=[]

  //Imagenes/colores listas
  arrayImg: any[] = [];
  arrayColores:any[]=[];

  //Objetos que recibimos y contruimos para las transacc
  tipo:string="";
  objRegistrar:Videojuegos = new Videojuegos;
  objRecepcion:Videojuegos=new Videojuegos;

  constructor(
    private dialog: MatDialogRef<ModalVjComponent>,
    private el: ElementRef,
    private vjService:VideoJuegoServiceService,
    
    
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    


  ) { }
  ngOnInit(): void {
    //Creamos el formgroup y focuseamos el raton en el input "nombre"
    this.formGroup();
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombre"]');
    invalidControl.focus();

     //Cargamos los array de imagen y colores
     this.comboPLataforma1();
     this.imagesArray();
     this.coloresArray();
    
    //Recibimos la data

    if(this.data!=null){
      this.objRecepcion=this.data['objeto']
      this.tipo=this.data['tipo']
      console.log(this.tipo)
      this.setVjRecepcion();
    }
   
    

   
    
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

    this.form.get("plataforma2")?.disable();
    this.form.get("plataforma3")?.disable();
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

      console.log(this.tipo)
     if(this.form.invalid || this.tipo=="edit"){
      if(this.form.invalid)  {window.alert("Formulario invalido");}  
     }else{

      try {
        this.constructorObj()
        this.vjService.registrarVj(this.objRegistrar).subscribe((data)=>{
          this.data=data
          console.log(data)
          if( this.data["mensaje"] == "Registrado correctamente"){
            this.close();
          }else{
            
          }
        })
      } catch (error) {
        window.alert("Error al registrar: "+error)
      }
      
      
      
     }
   
  }

  actualiza(){
    this.formValidators();

      console.log(this.tipo)
     if(this.form.invalid || this.tipo!="edit"){
      if(this.form.invalid)  {window.alert("Formulario invalido");}  
     }else{

      try {
        this.constructorObj()
        this.vjService.actualizarVj(this.objRegistrar).subscribe((data)=>{
          this.data=data
          console.log(data)
          if( this.data["mensaje"] == "Actualizado correctamente"){
            this.close();
          }else{
            
          }
        })
      } catch (error) {
        window.alert("Error al registrar: "+error)
      }
      
      
      
     }

  }

  setVjRecepcion(){
    this.objRegistrar.id=this.objRecepcion.id
    this.objRegistrar.rol="vj"
    this.form.get("nombre")?.setValue(this.objRecepcion.nombre)
    this.form.get("precio")?.setValue(this.objRecepcion.precio)
    this.form.get("color")?.setValue(this.objRecepcion.color)
    this.form.get("img")?.setValue(this.objRecepcion.img)
    this.form.get("descripcion")?.setValue(this.objRecepcion.descripcion)
    this.form.get("plataforma1")?.setValue(this.objRecepcion.plataforma1)
    
    
    
    if(this.form.get("plataforma1")?.value!=null){
      this.cambioPLataformas()
      this.form.get("plataforma2")?.enable();
      this.form.get("plataforma2")?.setValue(this.objRecepcion.plataforma2)
    }
    
    if(this.form.get("plataforma2")?.value!=null){
      this.cambioPLataformas2()
      this.form.get("plataforma3")?.enable();
      this.form.get("plataforma3")?.setValue(this.objRecepcion.plataforma3)
    }

  }

  constructorObj() {
    if(this.tipo!="edit"){
      this.objRegistrar.id=0
    }else{
      this.objRegistrar.id=this.objRecepcion.id
    }
    
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
    this.plataformas=[]
    this.plataformas.push(new Plataforma("PC","Microsoft",5))
    this.plataformas.push(new Plataforma("Play Station 4","Sony",4))
    this.plataformas.push(new Plataforma("Play Station 5","Sony",5))
    this.plataformas.push(new Plataforma("Xbox 360","Microsoft",4))
    this.plataformas.push(new Plataforma("Xbox One","Microsoft",5))
    this.plataformas.push(new Plataforma("Nintendo Switch","Nintendo",5))
  }

  comboPLataforma2(){
    this.plataformas2=[]
    this.plataformas2.push(new Plataforma("PC","Microsoft",5))
    this.plataformas2.push(new Plataforma("Play Station 4","Sony",4))
    this.plataformas2.push(new Plataforma("Play Station 5","Sony",5))
    this.plataformas2.push(new Plataforma("Xbox 360","Microsoft",4))
    this.plataformas2.push(new Plataforma("Xbox One","Microsoft",5))
    this.plataformas2.push(new Plataforma("Nintendo Switch","Nintendo",5))
  }

  comboPLataforma3(){

    this.plataformas3=[]
    this.plataformas3.push(new Plataforma("PC","Microsoft",5))
    this.plataformas3.push(new Plataforma("Play Station 4","Sony",4))
    this.plataformas3.push(new Plataforma("Play Station 5","Sony",5))
    this.plataformas3.push(new Plataforma("Xbox 360","Microsoft",4))
    this.plataformas3.push(new Plataforma("Xbox One","Microsoft",5))
    this.plataformas3.push(new Plataforma("Nintendo Switch","Nintendo",5))
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

  cambioPLataformas(){

    this.comboPLataforma2()
    this.comboPLataforma3()

    this.form.get("plataforma2")?.setValue("");
    this.form.get("plataforma3")?.setValue("");

    this.form.get("plataforma2")?.enable();
    
    if(this.form.get("plataforma1")?.value != null){

      var nombre=this.form.get("plataforma1")?.value
      var conta:number=0
      conta =this.plataformas2.findIndex( (vj) => vj.nombre==nombre);

      if(conta >-1){
        
        this.plataformas2.splice(conta,1)
        this.plataformas3.splice(conta,1)
        
      }else{console.log("No se encuentra en el combobox")}
    }

  }

  cambioPLataformas2(){
    this.comboPLataforma3()

    

    this.form.get("plataforma3")?.enable();

    if((this.form.get("plataforma1")?.value && this.form.get("plataforma2")?.value)!= null){

      var conta1:number=0
      var conta2:number=0

      conta1 =this.plataformas3.findIndex( (vj) => vj.nombre==this.form.get("plataforma1")?.value);
      
      
      if(conta1 >-1){
        
        this.plataformas3.splice(conta1,1)
        ///////////////////////////////
        conta2 =this.plataformas3.findIndex( (vj) => vj.nombre==this.form.get("plataforma2")?.value);
       if(conta2 >-1){this.plataformas3.splice(conta2,1)}
                      }else{}

    }
  }

  imagesArray(){
    //assets
     this.arrayImg = [
      {nombre:"Gears of war 2",path:"../../assets/GearsOfWar2.jpg"},
      {nombre:"BattleField 3",path:"../../assets/battlefield3.jpg"},
      {nombre:"Destiny",path:"../../assets/Destiny.jpg"},
      {nombre:"Mario Galaxy",path:"../../assets/Mario Galaxy.jpg"},
      {nombre:"HomeFront",path:"../../assets/HomeFront.jpg"},
      {nombre:"Default",path:"../../assets/logo_barra.jpg"}
    
    
    ]

  }

  coloresArray(){
    this.arrayColores = [
      {nombre:"red"},{nombre:"crimson"},{nombre:"lightSalmon"},
      {nombre:"MediumVioletRed"},{nombre:"DeepPink"},{nombre:"Pink"},
      {nombre:"Yellow"},{nombre:"LightGoldenrodYellow"},{nombre:"PaleGoldenrod"},
      {nombre:"MediumSlateBlue"},{nombre:"Purple"},{nombre:"DarkViolet"},

    ]
  }

  
}
