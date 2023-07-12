/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Router } from '@angular/router';




platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {redirectToLogin();})
  .catch(() => console.error(""));

  function redirectToLogin(): void {
    const router = new Router();
    router.navigate([""])
  }





