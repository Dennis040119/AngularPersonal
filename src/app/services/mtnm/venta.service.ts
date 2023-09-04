import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosVenta, ProductosVentaPk } from 'src/app/models/cliente/productos-venta';
import { Venta } from 'src/app/models/cliente/venta';


const baseUrl = 'http://localhost:8090/Venta'
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) {

  }

  listarVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(baseUrl + '/PvList');
  }

  buscarVentas(id:string): Observable<Venta[]> {
    return this.http.get<Venta[]>(baseUrl + '/VtBuscar/'+id);
  }

  UserVentas(Userid:string): Observable<Venta[]> {
    return this.http.get<Venta[]>(baseUrl + '/VtUser/'+Userid);
  }

  registrarVt(Vj:Venta):Observable<Venta>{
    return this.http.post<Venta>(baseUrl+'/VtSave',Vj);
  }
  actualizarVt(Vj:Venta){
    return this.http.put(baseUrl+'/VtPut',Vj);
  }

  eliminarVt(id:string){
    return this.http.delete(baseUrl+'/VtDelete/'+id);
  }
}
