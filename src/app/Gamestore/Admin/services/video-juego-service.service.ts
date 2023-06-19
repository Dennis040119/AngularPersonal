import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videojuegos } from '../../../models/mtnm/videojuegos';

const baseUrl = 'http://localhost:8090/videojuego'

@Injectable({
  providedIn: 'root'
})
export class VideoJuegoServiceService {

 ;


  constructor(private http: HttpClient) {

   }

  listarVideoJuegos(): Observable<Videojuegos[]> {
    return this.http.get<Videojuegos[]>(baseUrl + '/videoJuegoList');
  }

  registrarVj(Vj:Videojuegos){
    return this.http.post(baseUrl+'/videoJuegoSave',Vj);
  }
  actualizarVj(Vj:Videojuegos){
    return this.http.put(baseUrl+'/videoJuegoPut',Vj);
  }

  eliminarVj(id:string){
    return this.http.delete(baseUrl+'/videoJuegoDelete/'+id);
  }
}
