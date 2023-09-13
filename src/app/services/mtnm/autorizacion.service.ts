import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { credenciales } from 'src/app/models/mtnm/usuario';
import { GLOBAL } from '../utils/global';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  url:string =GLOBAL.URL_BASE

  constructor(

    private _http:HttpClient
  ) { }

  login(cred:credenciales):Observable<string>{
    return this._http.post<any>(this.url+"authenticate",cred);
  }

  isLoggedIn():boolean{

    const helper = new JwtHelperService();
    const token = localStorage.getItem("token");
    
    if(!token){//Primero comprobamos que el token exista
      console.log("Token no existe")
      return false;
    }else{//Segundo comprobamos que el token no sea cualquier cadena

      try{
        helper.decodeToken(token);
      }catch(e){
        //Si existe un error significa que el token no es un jwt token por lo tanto retornamos false
        console.log("error el token no es un jwy")
        return false;
        
      }


      //const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
      console.log(isExpired)
      return !isExpired; 

    }


  }
}
