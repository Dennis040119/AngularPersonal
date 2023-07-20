import { Pipe, PipeTransform } from '@angular/core';
import { EnumService } from '../services/mtnm/enum.service';
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
    
    
    var pla1:string=""
    var pla2:string|undefined
    var pla3:string|undefined
   
    this.lista=this.EnumService.listaPlataforma
   

    pla1=this.lista.find(val => val.platId==value.slice(0,5))?.nombre!
    cadena=pla1
    if(value.length>5){
      pla2=this.lista.find(val => val.platId==value.slice(6,11))?.nombre!
      cadena=cadena+","+pla2
    }

    if(value.length>11){
      pla3=this.lista.find(val => val.platId==value.slice(12,17))?.nombre!
      cadena=cadena+","+pla3
    }
    
    this.rpta=cadena
    return this.rpta
    
    
   
  }

  

  
}
