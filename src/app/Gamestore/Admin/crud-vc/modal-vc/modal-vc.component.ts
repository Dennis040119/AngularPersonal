import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumService } from '../../../../services/mtnm/enum.service';
import { VideoConsolaServiceService } from 'src/app/services/mtnm/video-consola-service.service';
import { Plataforma } from 'src/app/models/enum/plataforma';
import { VideoConsola } from 'src/app/models/mtnm/video-consola';
import { Marca } from 'src/app/models/enum/marca';
import { StorageService } from 'src/app/services/medias/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-vc',
  templateUrl: './modal-vc.component.html',
  styleUrls: ['./modal-vc.component.css']
})
export class ModalVcComponent implements OnInit,AfterViewInit{

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
  //Recibe la data de los metodos rest
  dataService:any

  tipo:string="";
  disabledBtn:boolean=false
  objRegistrar:VideoConsola = new VideoConsola;
  objRecepcion:VideoConsola=new VideoConsola;


  fileToUpload: File;
  dirImgVj:string="imgVideoConsolas"


  constructor(
    private dialog: MatDialogRef<ModalVcComponent>,
    private el: ElementRef,
    private VcService:VideoConsolaServiceService,
    private enumService:EnumService,
    private imgService:StorageService,
    private snackBar:MatSnackBar,



    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,



  ) { }
  
  ngOnInit(): void {

    this.formGroup();
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombre"]');
    invalidControl.focus();

    this.h1="Registro VideoConsolas"
    this.comboPlaformas();
    this.combomarcas();

    this.tipo=this.data['tipo']
    console.log(this.tipo)

    //Si es tipo editar
    if(this.data['obj']!=undefined && this.tipo=="edit"){
    this.objRecepcion=this.data['obj']
    this.h1="Actualizar VideoConsolas"
    console.log(this.objRecepcion)
    this.setVjRecepcion();
    
   
   
    }

    if(this.tipo=="detalle"){
      this.objRecepcion=this.data['obj']
      this.h1="Detalle VideoConsolas"
      this.setVjRecepcion();
      this.disabledBtn=true
      console.log(this.objRecepcion)
      this.form.disable()
    }
  
  }
  ngAfterViewInit(): void {
    this.fileToUpload =this.selectedFile
    
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

    this.formValidators();
    if(this.form.valid && this.tipo=="save"){
      this.constructorObj()
      

       //Verificamos que se ha escogido una imagen
       if (!this.fileToUpload) {
        console.error('Debe seleccionar un archivo, un id y un tipo de archivo.');
        return;
      }
      
        
      //Buscamos la plataforma en lista para setear en el objRegistrar como objeto "Plataforma"

      this.imgService.storeFile(this.fileToUpload, this.objRegistrar.vcid, "imgVideoConsolas").subscribe({
        next:(data1)=>{
          this.data=data1
          console.log(data1)
          if(this.data["url"]!=""){

            //Seteamos la url de la imagen guardada en el objeto VC
            this.objRegistrar.img=this.data["url"]

            this.VcService.registrarVc(this.objRegistrar).subscribe(data =>{
              console.log(this.objRegistrar)
              this.dataService=data
              if(this.dataService['mensaje']=="Registrado correctamente"){
                this.openSnackBar(this.dataService['mensaje'],"")
                this.close()
                
              }else{this.openSnackBar(this.dataService['mensaje'],"")}
            })
          }else{}
        
        },
        error:data=>{
          console.log(data)
        },
        complete:()=>{

        }
      })
      
      
    }else{this.form.valid?  "No es registrar":this.openSnackBar("Formulario invalido","")}
    
  }
  actualiza(){
    this.formValidators();

    if(this.form.valid && this.tipo=="edit"){
      this.constructorObj()
     
       //Buscamos la plataforma en lista para setear en el objRegistrar como objeto "Plataforma"

        //Verificamos que se ha escogido una imagen
        if (!this.fileToUpload) {
          console.error('Debe seleccionar un archivo, un id y un tipo de archivo.');
          return;
        }
        
          
        //Buscamos la plataforma en lista para setear en el objRegistrar como objeto "Plataforma"
  
        this.imgService.storeFile(this.fileToUpload, this.objRegistrar.vcid, "imgVideoConsolas").subscribe({
          next:(data1)=>{
            this.data=data1
            console.log(data1)
            if(this.data["url"]!=""){
  
              //Seteamos la url de la imagen guardada en el objeto VC
              this.objRegistrar.img=this.data["url"]
  
              this.VcService.actualizarVc(this.objRegistrar).subscribe(data =>{
                this.dataService=data
                if(this.dataService['mensaje']=="Actualizado correctamente"){
                  this.openSnackBar(this.dataService['mensaje'],"")
                  this.close()
                }else{this.openSnackBar(this.dataService['mensaje'],"")}
              })
            }else{this.openSnackBar("Error al cargar Imagen","")}
          
          },
          error:data=>{
            console.log(data)
            this.openSnackBar("Error al cargar Imagen","")
          },
          complete:()=>{
  
          }
        })
     
      console.log(this.objRegistrar)

     
    }else{this.form.valid?  "No es actualizar":this.openSnackBar("Formulario invalido","")}
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

    
    //Seteamos los valores cuando editamos un VJ
    this.objRegistrar.vcid=this.objRecepcion.vcid
    //El rol de videojuegos siempre sera 'vj'
    this.objRegistrar.rol="vc"
    this.form.get("nombre")?.setValue(this.objRecepcion.nombre)
    this.form.get("precio")?.setValue(this.objRecepcion.precio)

    //Operamos para poder cargar la imagen que le corresponde 
   
    this.selectedFileUrl=this.getimagen(this.objRecepcion.img)

    var patron: RegExp = /vc.*\.jpg/;
    var texto:string = ""
    console.log(this.getimagen(this.objRecepcion.img))

    if(this.getimagen(this.objRecepcion.img).match(patron) !=null){
      texto=this.getimagen(this.objRecepcion.img).match(patron)!.toString()!
    }
    
    console.log(texto)
    this.selectedFileName = texto

    
    //const files = 
    //console.log(files.item(0)?.name)
    
   
    
    this.form.get("descripcion")?.setValue(this.objRecepcion.descripcion)
    this.form.get("marca")?.setValue(this.objRecepcion.marca)

    this.form.get("plataforma")?.setValue(this.objRecepcion.plataforma.platId)

    





  }

  constructorObj() {
    
     
    if(this.tipo!="edit"){this.objRegistrar.vcid="0"}
    else{this.objRegistrar.vcid=this.objRecepcion.vcid}

    this.objRegistrar.rol="vc"
    this.objRegistrar.nombre=this.form.get("nombre")?.value
    this.objRegistrar.precio=this.form.get("precio")?.value

    var cadena ="../../assets/Consolas/"
    this.objRegistrar.img=cadena+this.selectedFileName

    this.objRegistrar.descripcion=this.form.get("descripcion")?.value

    //Find la plataforma que seleciono en el comboBox dentro de la lista
    var pla =this.plataformas.find(plata => plata.platId==this.form.get("plataforma")?.value)
    if(pla!=undefined){this.objRegistrar.plataforma=pla}
    
    this.objRegistrar.marca=this.form.get("marca")?.value

  }

  formValidators(){

    this.form.get('nombre')?.setValidators([Validators.required]);
    this.form.get('nombre')?.updateValueAndValidity();

   

    this.form.get('precio')?.setValidators([Validators.required,
    Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]);
    this.form.get('precio')?.updateValueAndValidity();

    this.form.get('plataforma')?.setValidators([Validators.required]);
    this.form.get('plataforma')?.updateValueAndValidity();

    this.form.get('img')?.setValidators([Validators.required]);
    this.form.get('img')?.updateValueAndValidity();

    this.form.get('img')?.setValue(this.selectedFileName)

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

  //Metodo para el registro de los nombres de las imagenes jpg
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


  handleFileInput(event: Event) {
    
    const files = (event.target as HTMLInputElement).files!;
    console.log(files.item(0)?.name)
    this.fileToUpload = files.item(0)!;

    console.log(this.fileToUpload)
  }

  uploadFile(id:string,dir:string) {
    if (!this.fileToUpload) {
      console.error('Debe seleccionar un archivo, un id y un tipo de archivo.');
      return;
    }

    this.imgService.storeFile(this.fileToUpload, id, dir).subscribe({
      next:data=>{
        console.log(data)
      },
      error:data=>{
        console.log(data)
      }
    })
      
  }

  getimagen(filename:string){
    return this.imgService.getImagen(filename,this.dirImgVj)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
  
}
