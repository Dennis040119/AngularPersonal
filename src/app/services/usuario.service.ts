import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8090/usuario'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  

  constructor(private http: HttpClient) {

   }

   listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(baseUrl + '/usuarioList');
  }
}
