export class Plataforma {
    

    id!:string;
    nombre!: string;
    marca!: string;
    generacion!: number;


    constructor( id:string,nombre:string,marca:string,generacion:number) { 
        this.id=id
        this.nombre=nombre
        this.marca=marca
        this.generacion=generacion
    }


  }


