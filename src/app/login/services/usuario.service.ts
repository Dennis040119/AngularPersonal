import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

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

    BuscarPorUser(user:string): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(baseUrl + '/usuarioxUser/'+user);
    }

    buscarLogin(user:string,pass:string)
    {
          return this.http.get<Usuario[]>(baseUrl+'/loginFind/'+user+'/'+pass);
    }
}
