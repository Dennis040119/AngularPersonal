import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router'
import { EnumService } from '../../../services/mtnm/enum.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;

  events: string[] = [];
  opened: boolean = false;

  username:string=localStorage.getItem("user")!
  static snackBar: MatSnackBar;



  constructor(
    private router:Router,
    private Enum:EnumService,
    private snackBar:MatSnackBar
  ){

  }
  ngOnInit(): void {
    this.Enum.listarPlataformas().subscribe(data=>{

    })
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

  static openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

}
