import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';
import { any } from 'prop-types';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    var token:string = ""
    if(localStorage.getItem('token')){token=localStorage.getItem('token')!;}
    console.log('Interceptor activado');
    //Clonamos request ya que es un objeto inmutable
    //Modificamos el clon 

    if (request.url.includes('http://localhost:8090/media/upload/')) {
      // Si es el servicio específico, no añadir el encabezado de autorización
      return next.handle(request);
    }
    
    const requestCloned = request.clone({
      headers:request.headers
      .set('content-type','application/json')
      .set('Cache-Control','no-cache')//para evitar cacheos en las peticiones
      .set('Pragma','no-cache')//para evitar cacheos en las peticiones
      .set('Expires','Sat, 01 Jan 2000 00:00:00 GMT')//para evitar cacheos en las peticiones
      .set('Authorization', `Bearer ${token}`)
    });
   
    return next.handle(requestCloned).pipe(catchError(x=> this.handleAuthError(x)));;
  }
}
