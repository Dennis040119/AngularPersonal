import { Usuario } from "../mtnm/usuario"

export class Venta {
    venId:string
    usuario:Usuario
    total:number
    direccion:string
    rol:string
    fCompra:Date
    fEntrega:Date
}
