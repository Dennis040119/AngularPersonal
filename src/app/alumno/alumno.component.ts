import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {
  

  num1?:number;
  num2?:number;
  result?:number;

  sumar(){
     
    if(this.num1 !=undefined && this.num2!=undefined){
      this.result=this.num1+this.num2;
    }else{

      console.log(this.num1 + " + "+ this.num2)
      window.alert("Falta un numero")
    }
    
  }

  restar(){
    if(this.num1 !=undefined && this.num2!=undefined){
      this.result=this.num1-this.num2;
    }else{
      window.alert("Falta un numero")
    }
  }

  multiplicar(){
    if(this.num1 !=undefined && this.num2!=undefined){
      this.result=this.num1*this.num2;
    }else{
      window.alert("Falta un numero")
    }
  }

  dividir(){
    if(this.num1 !=undefined && this.num2!=undefined){
      this.result=this.num1/this.num2;
    }else{
      window.alert("Falta un numero")
    }
    }

    tablas(){
      
    }
}
