import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosVenta, ProductosVentaPk } from 'src/app/models/cliente/productos-venta';


const baseUrl = 'http://localhost:8090/ProductosVenta'

@Injectable({
  providedIn: 'root'
})

export class ProductoVentaService {

  constructor(private http: HttpClient) {

  }

  listarProductos(): Observable<ProductosVenta[]> {
    return this.http.get<ProductosVenta[]>(baseUrl + '/PvList');
  }

  buscarProductos(id:ProductosVentaPk): Observable<ProductosVenta[]> {
    return this.http.get<ProductosVenta[]>(baseUrl + '/PvBuscar/'+id.venId+'/'+id.proId);
  }

  registrarPv(Vj:ProductosVenta){
    return this.http.post(baseUrl+'/PvSave',Vj);
  }
  actualizarPv(Vj:ProductosVenta){
    return this.http.put(baseUrl+'/PvPut',Vj);
  }

  eliminarPv(id:ProductosVentaPk){
    return this.http.delete(baseUrl+'/PvDelete/'+id.venId+'/'+id.proId);
  }
}