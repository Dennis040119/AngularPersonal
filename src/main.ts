import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    redirectToLogin();
  })
  .catch(err => console.error(""));

  function redirectToLogin(): void {
    const router = new Router();
    router.navigateByUrl('');
  }





