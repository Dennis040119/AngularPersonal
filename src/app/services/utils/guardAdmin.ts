import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class GuardAdmin implements CanActivate {

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


     public setAcces(boo:boolean){
        this.acces=boo
      }
      public  getAcces(){
        return this.acces
      }
}
