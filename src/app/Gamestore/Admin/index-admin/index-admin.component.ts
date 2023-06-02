import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent {

  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;

  events: string[] = [];
  opened: boolean = false;

  constructor(
    private router:Router
  ){

  }


  getSidenav(): boolean {
    return this.Sidenav;
  }
  setSidenav(value: boolean) {
    this.Sidenav = value;
  }

  login(){
    this.router.navigate(['']);
  }

}
