import { Pipe, PipeTransform } from '@angular/core';
import { EnumService } from '../Gamestore/Admin/services/enum.service';
import { Plataforma } from '../models/enum/plataforma';
import { tap } from 'rxjs';

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

    this.EnumService.listarPlataformas().subscribe( data =>{
      this.EnumService.listaPlataforma=data
      console.log(this.EnumService.listaPlataforma)
    })
    this.lista=this.EnumService.listaPlataforma
    console.log(this.EnumService.listaPlataforma)
    pla1=this.lista.find(val => val.platId==value.slice(0,5))?.nombre!
    cadena=pla1
    
    this.rpta=cadena
    return this.rpta
    
   
  }

  

  
}
