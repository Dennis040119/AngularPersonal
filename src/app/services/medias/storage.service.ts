import { Injectable } from '@angular/core';
import { GLOBAL } from '../utils/global';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private backendBaseUrl = GLOBAL.URL_BASE+'media'

  constructor(private http:HttpClient) { }

  storeFile(file: File, id: string, tipofile: string) {

    const url = `${this.backendBaseUrl}/upload/${id}/${tipofile}`;
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.backendBaseUrl+"/upload/"+id+"/"+tipofile, formData)  
  }
  

  getImagen(filename: string, dirFile: string): string {
    const resourceUrl = `${this.backendBaseUrl}/file/${filename}/${dirFile}`;
    return resourceUrl;
  }

  deleteImagen(filename: string, dirFile: string){
   
    return this.http.delete(this.backendBaseUrl+'/delfile/'+filename+'/'+dirFile);
  }
}
