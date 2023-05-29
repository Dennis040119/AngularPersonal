import { Injectable } from "@angular/core";
import { CanActivate, CanActivateFn } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class Guard implements CanActivate {

    constructor(
        
      ) { }
    
    canActivate(): boolean {

        const currentUser=localStorage.getItem("key");
        if(currentUser=="true")
        {
            return true
        }else{
            return false
        }
        
      }
}
