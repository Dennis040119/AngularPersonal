import { CanActivate, Router } from '@angular/router';

export class notFoundGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    this.router.navigate([""]); // Redireccionar a la página inicial (puedes cambiar '/' por la ruta que desees)
    return false; // Evitar la navegación a la ruta original
  }
}
