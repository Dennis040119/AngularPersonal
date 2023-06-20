import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Plataforma } from 'src/app/models/enum/plataforma';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { EnumService } from 'src/app/Gamestore/Admin/services/enum.service';
import { VideoJuegoServiceService } from 'src/app/Gamestore/Admin/services/video-juego-service.service';
import { Genero } from 'src/app/models/enum/genero';
import { last } from 'rxjs';

@Component({
  selector: 'app-modal-vj',
  templateUrl: './modal-vj.component.html',
  styleUrls: ['./modal-vj.component.css']
})
export class ModalVjComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;

  public form!: FormGroup;

  //titulo
  h1:string=""

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
  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

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
      
      this.h1="Registro VideoJuegos"
    //Recibimos la data
    
    if(this.data!=null &&this.data['objeto']!=undefined){
      this.objRecepcion=this.data['objeto']
      this.tipo=this.data['tipo']
      this.h1="Actualizar VideoJuegos"
     
     
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

          var gen
          gen = this.generosList.find(gen => gen.genId==this.form.get("genero")?.value);
          if(gen !=undefined){
            this.objRegistrar.genero=gen
          }
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

      
     if(this.form.invalid || this.tipo!="edit"){
      if(this.form.invalid)  {window.alert("Formulario invalido");}
     }else{

      try {
        this.constructorObj()
        var gen
        gen = this.generosList.find(gen => gen.genId==this.form.get("genero")?.value);
        if(gen !=undefined){
          this.objRegistrar.genero=gen
        }

        this.vjService.actualizarVj(this.objRegistrar).subscribe((data)=>{
          this.data=data
         
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
    //El rol de videojuegos siempre sera 'vj'
    this.objRegistrar.rol="vj"
    this.form.get("nombre")?.setValue(this.objRecepcion.nombre)
    this.form.get("precio")?.setValue(this.objRecepcion.precio)

    //Operamos para poder cargar la imagen que le corresponde 
    var numero = this.objRecepcion.img.length
    this.selectedFileUrl=this.objRecepcion.img
    this.selectedFileName = this.objRecepcion.img.substring(24,numero)
   
    
    this.form.get("genero")?.setValue(this.objRecepcion.genero.genId)
    this.form.get("descripcion")?.setValue(this.objRecepcion.descripcion)
    this.enumService.listarPlataformas().subscribe(data =>{

      lista=data
      var codigo1=this.objRecepcion.plataformas.slice(0,5)

      this.form.get("plataforma1")?.setValue(codigo1)


      /////////////////////////
      if(this.objRecepcion.plataformas.length>=5){
        this.cambioPLataformas()
        this.form.get("plataforma2")?.enable();
       
        this.form.get("plataforma2")?.setValue(this.objRecepcion.plataformas.slice(6,11))
      }
      
      if(this.objRecepcion.plataformas.length>=11){
        this.cambioPLataformas2()
        this.form.get("plataforma3")?.enable();
        
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

    var cadena ="../../assets/PortadasVj/"
    this.objRegistrar.img=cadena+this.selectedFileName

   
    
    
    
    this.objRegistrar.descripcion=this.form.get("descripcion")?.value
    this.objRegistrar.plataformas=this.form.get("plataforma1")?.value


    if(this.form.get("plataforma2")?.value != undefined){

        this.objRegistrar.plataformas=this.objRegistrar.plataformas+","+this.form.get("plataforma2")?.value

        ////////////////////////////////////
        if(this.form.get("plataforma3")?.value != ""){
          this.objRegistrar.plataformas=this.objRegistrar.plataformas+","+this.form.get("plataforma3")?.value
        }
      

    }

    if(this.objRegistrar.plataformas.endsWith(",")){
      console.log("paso el endswith")
      this.objRegistrar.plataformas=this.objRegistrar.plataformas.replace(',','')
    }else{}
    
    console.log(this.objRegistrar)


  }

  formValidators(){

    this.form.get('nombre')?.setValidators([Validators.required]);
    this.form.get('nombre')?.updateValueAndValidity();

   

    this.form.get('precio')?.setValidators([Validators.required,
    Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]);
    this.form.get('precio')?.updateValueAndValidity();

    this.form.get('plataforma1')?.setValidators([Validators.required]);
    this.form.get('plataforma1')?.updateValueAndValidity();

  }

  comboPLataforma1(){
    return this.enumService.listarPlataformas().subscribe((data)=>{
      this.plataformas=data
      this.plataformas.splice(0,1)
    })}

  cambioPLataformas(){

    
    this.plataformas2=[]

    this.form.get("plataforma2")?.setValue("");
    this.form.get("plataforma3")?.setValue("");

    this.form.get("plataforma2")?.enable();

    if(this.form.get("plataforma1")?.value != null){

      var id=this.form.get("plataforma1")?.value
      var conta:number=0


      this.enumService.listarPlataformas().subscribe((data)=>{
        this.plataformas2=data
        this.plataformas2.splice(0,1)
        
        conta =this.plataformas2.findIndex( (plata) => plata.platId==id);
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

        conta1 =this.plataformas3.findIndex( (vj) => vj.platId==this.form.get("plataforma1")?.value);

        this.plataformas3.splice(0,1)
        if(conta1 >-1){

        this.plataformas3.splice(conta1,1)
        ///////////////////////////////
        conta2 =this.plataformas3.findIndex( (vj) => vj.platId==this.form.get("plataforma2")?.value);
        if(conta2 >-1){this.plataformas3.splice(conta2,1)}

        }else{console.log("No se encuentra en el combobox")}


      })


    }
  }

  

  generoComboBox(){
    this.enumService.listarGenero().subscribe(data =>{
      this.generosList=data
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    
    this.getURLFromFile(this.selectedFile)
    
  }

  getURLFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileUrl = e.target.result;
      this.selectedFileName = this.selectedFile.name;
    };
    reader.readAsDataURL(file);
    
  }




}
