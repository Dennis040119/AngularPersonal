import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class guardUserGuard implements CanActivate {

  public acces:boolean;
  

  constructor(
    private router: Router,
    
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      
      
      
      
      if(this.acces==true && localStorage.getItem("token"))
      {
          return true
      }else{
        this.router.navigate(['']);
        return false
          
      }
      
    }
}
