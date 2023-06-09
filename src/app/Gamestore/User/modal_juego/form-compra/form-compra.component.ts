import { ProductosVenta } from 'src/app/models/cliente/productos-venta';
import { ProductoVentaService } from './../../services/producto-venta.service';
import { Component,ElementRef,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetalleCompraComponent } from '../detalle-compra/detalle-compra.component';
import { VideojuegosHome } from '../../VideoJuegosHome/VideoJuegosHome.component';
import { Videojuegos } from 'src/app/models/mtnm/videojuegos';
import { VentaService } from '../../services/venta.service';
import { Venta } from 'src/app/models/cliente/venta';
import { UsuarioService } from 'src/app/login/services/usuario.service';
import { Usuario } from 'src/app/models/mtnm/usuario';

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
  totalVenta:number=0
  ///Objetos para las transacciones
  VentaObj:Venta=new Venta()
  user:Usuario
  ProductosVentaObj:ProductosVenta


  constructor(
    //Referencia a los componentes
    private dialogRef: MatDialogRef<FormCompraComponent>,
    private dialogRef2:MatDialog,
    
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    
    //Serviciios
    private VenServicios:VentaService,
    private PvService:ProductoVentaService,
    private UserService:UsuarioService

  ) { }


  ngOnInit(): void {
    //Hacemos que el curso se haga focus en el primer formcontrol(nombre)
    const invalidControl = this.el.nativeElement.querySelector('[formControlName="nombres"]');
    invalidControl.focus();
    this.formGroup();

    //Seteamos la fecha minima para el calendario
    this.minDate.setDate(this.minDate.getDate()+1)
    
    console.log(VideojuegosHome.carrito);
    
    //Tiempo para cerrar el componente(5 min)
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
      this.construirVenta()
      ////////////////////////////obtener el usuario que esta registrado y setearlo en el obj venta
      this.UserService.BuscarPorUser(localStorage.getItem("user")!).subscribe({

        next:(data)=>{
          this.user=data[0]
          console.log(data[0])
          this.VentaObj.usuario=this.user
        },
        error:(error)=>{
          window.alert("Error al encontrar Usuario")
        },
        complete:()=>{  
          console.log(this.user)
          this.VenServicios.registrarVt(this.VentaObj).subscribe({
            
            next: data=>{
              console.log(this.VentaObj)
              console.log(data)
              if(data.venId=="0000"){
                window.alert("Error al registrar compra")
              }else{
                VideojuegosHome.carrito.forEach(element => {
                  element.productosVentaPk.venId=data.venId
                  this.PvService.registrarPv(element).subscribe({
    
                    
    
                   next: data=>{
                       var rpta:any
                       rpta=data
                      if(rpta["mensaje"]=="Registrado correctamente"){
                       
                        VideojuegosHome.carrito=[];
          
                        this.dialogRef2.closeAll();
                      }else{
                        window.alert(rpta["mensaje"])
                      }
                    },
                    error:data=>{},
                    complete:()=>{}
    
    
                  })
                });

              }
            },
            error:data=>{},
            complete:()=>{
              window.alert("Compra exitosa")
            }
    
    
    
    
          })}
      })
      
     
      ////////////////////////////////////////////////////////////////
    
      
     }
   }

   construirVenta(){
    var userLocal=localStorage.getItem("user")
    this.VentaObj.venId=""
    
    this.VentaObj.nombre=this.form.get("nombres")!.value+" "+this.form.get("apellidos")!.value
    this.VentaObj.movil=this.form.get("movil")!.value
    this.VentaObj.correo=this.form.get("correo")!.value
    this.VentaObj.tarjeta=this.form.get("tarjeta")!.value
    this.VentaObj.direccion=this.form.get("direccion")!.value
    this.VentaObj.rol="vt"
    this.VentaObj.fEntrega=this.form.get("fchEntrega")!.value
    this.SumarTotal()
    this.VentaObj.total=this.totalVenta



   }

   

   SumarTotal(){
    VideojuegosHome.carrito.forEach(element => {
      this.totalVenta=this.totalVenta+element.precio
    });
   }

}


