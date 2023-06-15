import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalVjComponent } from '../../crud-vj/crud-vj.component';
import { EnumService } from '../../services/enum.service';
import { VideoJuegoServiceService } from '../../services/video-juego-service.service';
import { VideoConsolaServiceService } from '../../services/video-consola-service.service';
import { Plataforma } from 'src/app/models/plataforma';
import { VideoConsola } from 'src/app/models/video-consola';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-modal-vc',
  templateUrl: './modal-vc.component.html',
  styleUrls: ['./modal-vc.component.css']
})
export class ModalVcComponent implements OnInit{

  @ViewChild('fileInput') fileInput: any;
  //Url
  selectedFile!: File;
  selectedFileUrl: string="";
  selectedFileName: string="";

  public form!: FormGroup;

  //titulo
  h1:string=""
  nombres:string
  ///Arrays combobox
  plataformas: Plataforma[]=[]
  Marcas:Marca[]
  

  tipo:string="";
  objRegistrar:VideoConsola = new VideoConsola;
  objRecepcion:VideoConsola=new VideoConsola;

  constructor(
    private dialog: MatDialogRef<ModalVcComponent>,
    private el: ElementRef,
    private VcService:VideoConsolaServiceService,
    private enumService:EnumService,


    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,



  ) { }
  ngOnInit(): void {

    this.formGroup();
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombre"]');
    invalidControl.focus();

    this.h1="Registro VideoJuegos"
    this.comboPlaformas();
    this.combomarcas();

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
      plataforma:[],
      marca:[],
      img:[],
    })
  }
  registar(){

  }
  actualiza(){

  }

  comboPlaformas(){
    this.enumService.listarPlataformas().subscribe((data)=>{
      this.plataformas=data
      this.plataformas.splice(0,1)
    })
  }

  combomarcas(){
    this.enumService.listarMarcas().subscribe((data)=>{
      this.Marcas=data
      
    })
  }

  setVjRecepcion(){

    var lista
    //Seteamos los valores cuando editamos un VJ
    this.objRegistrar.vcid=this.objRecepcion.vcid
    //El rol de videojuegos siempre sera 'vj'
    this.objRegistrar.rol="vj"
    this.form.get("nombre")?.setValue(this.objRecepcion.nombre)
    this.form.get("precio")?.setValue(this.objRecepcion.precio)

    //Operamos para poder cargar la imagen que le corresponde 
    var numero = this.objRecepcion.img.length
    this.selectedFileUrl=this.objRecepcion.img
    this.selectedFileName = this.objRecepcion.img.substring(24,numero)
   
    
    this.form.get("descripcion")?.setValue(this.objRecepcion.descripcion)
    this.form.get("marca")?.setValue(this.objRecepcion.marca)

    this.form.get("plataforma")?.setValue(this.objRecepcion.Plataforma.id)

    





  }

  constructorObj() {
    
     
    if(this.tipo!="edit"){this.objRegistrar.vcid="0"}
    else{this.objRegistrar.vcid=this.objRecepcion.vcid}

    this.objRegistrar.rol="vj"
    this.objRegistrar.nombre=this.form.get("nombre")?.value
    this.objRegistrar.precio=this.form.get("precio")?.value

    var cadena ="../../assets/Consolas/"
    this.objRegistrar.img=cadena+this.selectedFileName

    this.objRegistrar.descripcion=this.form.get("descripcion")?.value
    this.objRegistrar.Plataforma=this.form.get("plataforma1")?.value
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
