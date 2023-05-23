import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videojuegos } from '../models/videojuegos';

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
}
