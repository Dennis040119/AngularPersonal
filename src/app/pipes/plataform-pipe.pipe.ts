import { Pipe, PipeTransform } from '@angular/core';
import { EnumService } from '../Gamestore/Admin/services/enum.service';
import { Plataforma } from '../models/enum/plataforma';
import { finalize } from 'rxjs';


@Pipe({
  name: 'plataformPipe'
})
export class PlataformPipePipe implements PipeTransform {

  lista:Plataforma[]=[]
  rpta:string
  constructor(
    private EnumService:EnumService)
    {
    
    }

  transform(value: string): string {
   
    var cadena:string=""
    console.log(value)
    
    var pla1:string=""
    var pla2:string|undefined
    var pla3:string|undefined
   
    this.lista=this.EnumService.listaPlataforma
    console.log(this.lista)

    pla1=this.lista.find(val => val.platId==value.slice(0,5))?.nombre!
    cadena=pla1
    if(value.length>5){
      console.log(this.lista.find(val => val.platId==value.slice(6,11))?.nombre!)
      pla2=this.lista.find(val => val.platId==value.slice(6,11))?.nombre!
      cadena=cadena+","+pla2
    }

    if(value.length>11){
      console.log(this.lista.find(val => val.platId==value.slice(12,17))?.nombre!)
      pla3=this.lista.find(val => val.platId==value.slice(12,17))?.nombre!
      cadena=cadena+","+pla3
    }
    
    this.rpta=cadena
    console.log(this.rpta)
    return this.rpta
    
    
   
  }

  

  
}
