import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Plataforma } from 'src/app/models/plataforma';
import { Videojuegos } from 'src/app/models/videojuegos';
import { EnumService } from 'src/app/Gamestore/Admin/services/enum.service';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { Genero } from 'src/app/models/genero';

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

  //Genero
  generosList:Genero[]=[];

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
    private enumService:EnumService,


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
     this.generoComboBox();
      this.imagesArray();


    //Recibimos la data

    if(this.data!=null){
      this.objRecepcion=this.data['objeto']
      this.tipo=this.data['tipo']
      console.log(this.tipo)
      console.log(this.objRecepcion)
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
      genero:[],
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


     if(this.form.invalid || this.tipo=="edit"){
      if(this.form.invalid)  {window.alert("Formulario invalido");}
     }else{

      try {
        this.constructorObj()
        console.log(this.objRegistrar)
         this.vjService.registrarVj(this.objRegistrar).subscribe((data)=>{
         this.data=data
         console.log(this.objRegistrar)
       if( this.data["mensaje"] == "Registrado correctamente"){
             this.close();
           }else{
             window.alert(this.data["mensaje"])
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
          console.log(this.data["mensaje"])
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

    var lista
    //Seteamos los valores cuando editamos un VJ
    this.objRegistrar.id=this.objRecepcion.id
    this.objRegistrar.rol="vj"
    this.form.get("nombre")?.setValue(this.objRecepcion.nombre)
    this.form.get("precio")?.setValue(this.objRecepcion.precio)

    this.form.get("img")?.setValue(this.objRecepcion.img)
    console.log(this.objRecepcion.genero)
    this.form.get("genero")?.setValue(this.objRecepcion.genero)
    this.form.get("descripcion")?.setValue(this.objRecepcion.descripcion)
    this.enumService.listarPlataformas().subscribe(data =>{

      lista=data
      var codigo1=this.objRecepcion.plataformas.slice(0,5)

      this.form.get("plataforma1")?.setValue(codigo1)
      console.log(this.objRecepcion.plataformas.length)

      /////////////////////////
      if(this.objRecepcion.plataformas.length>5){
        this.cambioPLataformas()
        this.form.get("plataforma2")?.enable();
        console.log(this.objRecepcion.plataformas.slice(6,11))
        this.form.get("plataforma2")?.setValue(this.objRecepcion.plataformas.slice(6,11))
      }

      if(this.objRecepcion.plataformas.length>12){
        this.cambioPLataformas2()
        this.form.get("plataforma3")?.enable();
        console.log(this.objRecepcion.plataformas.slice(12,17))
        this.form.get("plataforma3")?.setValue(this.objRecepcion.plataformas.slice(12,17))
      }

    })





  }

  constructorObj() {
    
    if(this.tipo!="edit"){this.objRegistrar.id="0"}
    else{this.objRegistrar.id=this.objRecepcion.id}

    this.objRegistrar.rol="vj"
    this.objRegistrar.nombre=this.form.get("nombre")?.value
    this.objRegistrar.precio=this.form.get("precio")?.value
    this.objRegistrar.img=this.form.get("img")?.value
    this.objRegistrar.genero=this.form.get("genero")?.value
    this.objRegistrar.descripcion=this.form.get("descripcion")?.value
    this.objRegistrar.plataformas=this.form.get("plataforma1")?.value


    if(this.form.get("plataforma2")?.value != undefined){

        this.objRegistrar.plataformas=this.objRegistrar.plataformas+","+this.form.get("plataforma2")?.value

        ////////////////////////////////////
        if(this.form.get("plataforma3")?.value != ""){
          this.objRegistrar.plataformas=this.objRegistrar.plataformas+","+this.form.get("plataforma3")?.value
        }
      

    }
    console.log(this.objRegistrar.plataformas)
    console.log(this.objRegistrar)


  }

  formValidators(){

    this.form.get('nombre')?.setValidators([Validators.required]);
    this.form.get('nombre')?.updateValueAndValidity();

    this.form.get('img')?.setValidators([Validators.required]);
    this.form.get('img')?.updateValueAndValidity();

    this.form.get('precio')?.setValidators([Validators.required,
    Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]);
    this.form.get('precio')?.updateValueAndValidity();

    this.form.get('plataforma1')?.setValidators([Validators.required]);
    this.form.get('plataforma1')?.updateValueAndValidity();

  }

  comboPLataforma1(){return this.enumService.listarPlataformas().subscribe((data)=>{this.plataformas=data})}

  cambioPLataformas(){

    console.log("Cambio plataformas"+this.plataformas)
    this.plataformas2=[]

    this.form.get("plataforma2")?.setValue("");
    this.form.get("plataforma3")?.setValue("");

    this.form.get("plataforma2")?.enable();

    if(this.form.get("plataforma1")?.value != null){

      var id=this.form.get("plataforma1")?.value
      var conta:number=0


      this.enumService.listarPlataformas().subscribe((data)=>{this.plataformas2=data

        console.log(id)
        console.log(this.plataformas2)
        conta =this.plataformas2.findIndex( (plata) => plata.id==id);
        if(conta >-1){

          this.plataformas2.splice(conta,1)
          this.plataformas3.splice(conta,1)

        }else{console.log("No se encuentra en el combobox")}



      })

    }else{
      console.log("Form plataformas 1 es null");
      console.log(this.form.get("plataforma1")?.value);
    }

  }

  cambioPLataformas2(){


    this.plataformas3=[]

    this.form.get("plataforma3")?.enable();

    if((this.form.get("plataforma1")?.value && this.form.get("plataforma2")?.value)!= null){

      var conta1:number=0
      var conta2:number=0
      this.enumService.listarPlataformas().subscribe((data)=>{this.plataformas3=data

        conta1 =this.plataformas3.findIndex( (vj) => vj.id==this.form.get("plataforma1")?.value);


        if(conta1 >-1){

        this.plataformas3.splice(conta1,1)
        ///////////////////////////////
        conta2 =this.plataformas3.findIndex( (vj) => vj.id==this.form.get("plataforma2")?.value);
        if(conta2 >-1){this.plataformas3.splice(conta2,1)}

        }else{console.log("No se encuentra en el combobox")}


      })


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

  generoComboBox(){
    this.enumService.listarGenero().subscribe(data =>{
      this.generosList=data
    })
  }




}
