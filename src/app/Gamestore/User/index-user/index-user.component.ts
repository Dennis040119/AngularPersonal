import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent {

  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;

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
