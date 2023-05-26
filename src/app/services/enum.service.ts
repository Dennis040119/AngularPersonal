import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plataforma } from '../models/plataforma';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8090/enums'
@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private http: HttpClient) {

  }

  listarPlataformas():Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(baseUrl + '/PlataformaList');
  }
}