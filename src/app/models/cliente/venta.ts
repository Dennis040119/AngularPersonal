import { Usuario } from "../mtnm/usuario"

export class Venta {
    venId:string
    usuario:Usuario
    nombre:string
    correo:string
    movil:string
    tarjeta:string
    total:number
    direccion:string
    rol:string
    fCompra:Date
    fEntrega:Date
    horaEntrega:string
}
