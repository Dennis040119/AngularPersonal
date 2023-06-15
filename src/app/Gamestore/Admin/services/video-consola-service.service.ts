import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoConsola } from 'src/app/models/video-consola';

const baseUrl = 'http://localhost:8090/videoconsola'

@Injectable({
  providedIn: 'root'
})
export class VideoConsolaServiceService {

  constructor(private http: HttpClient) { }

  listarVideoConsolas(): Observable<VideoConsola[]> {
    return this.http.get<VideoConsola[]>(baseUrl + '/vclist');
  }
  buscarVideoCon(id:string):Observable<VideoConsola[]>{
    return this.http.get<VideoConsola[]>(baseUrl + '/vcBuscar/'+id);
  }

  registrarVc(Vj:VideoConsola){
    return this.http.post(baseUrl+'/VcSave',Vj);
  }
  actualizarVc(Vj:VideoConsola){
    return this.http.put(baseUrl+'/VcPut',Vj);
  }

  eliminarVc(id:string){
    return this.http.delete(baseUrl+'/VcDelete/'+id);
  }
}
