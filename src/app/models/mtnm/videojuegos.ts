import { Genero } from "./../enum/genero";

export class Videojuegos {

    id!: string;
    nombre!: string;
    precio!: number;
    descripcion!: string;
    plataformas!: string;
    genero!:Genero;
    rol!:string;
    img!: string;
    

}
