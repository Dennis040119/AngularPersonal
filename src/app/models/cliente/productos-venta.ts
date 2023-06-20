

export class ProductosVenta {

    productosVentaPk:ProductosVentaPk
    nombre:string
    precio:number
    cantidad:number
    rol:string
    img:string

    constructor(pk:ProductosVentaPk,nombre:string,precio:number,cantidad:number,rol:string,img:string){
        this.productosVentaPk=pk
        this.nombre=nombre
        this.precio=precio
        this.cantidad=cantidad
        this.rol=rol
        this.img=img
    }
}

export class ProductosVentaPk {
    venId:string
    proId:string
    constructor(venId:string,proId:string){
        this.venId=venId
        this.proId=proId
    }
  }
