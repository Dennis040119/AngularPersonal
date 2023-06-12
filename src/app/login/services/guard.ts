import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class Guard implements CanActivate {

    static roles:string="";
    

    constructor(
      private router: Router,
      
      ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const currentUser=localStorage.getItem("key");
        
        
        
        if(currentUser=="true")
        {
            return true
        }else{
          this.router.navigate(['']);
          return false
            
        }
        
      }
}
