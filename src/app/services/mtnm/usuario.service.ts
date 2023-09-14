import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/mtnm/usuario';

const baseUrl = 'http://localhost:8090/usuario'





@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient
    ) { }


    


    listarUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(baseUrl + '/usuarioList');
    }

    listarUsuariosActivos(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(baseUrl + '/usuarioAcList',);
    }

    BuscarPorUser(user:string): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(baseUrl + '/usuarioxUser/'+user,);
    }

    buscarLogin(user:string,pass:string)
    {
          return this.http.get<Usuario[]>(baseUrl+'/loginFind/'+user+'/'+pass,);
    }

    registrar(user:Usuario){
      return this.http.post((baseUrl + '/usuarioSave'),user);
    }

    actualizar(user:Usuario){
      return this.http.put((baseUrl + '/usuarioPut'),user);
    }

    eliminar(id:string){
      return this.http.delete((baseUrl + '/UsuarioDelete/'+id));
    }
}
