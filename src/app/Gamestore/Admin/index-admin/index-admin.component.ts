import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router'
import { EnumService } from '../../../services/mtnm/enum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/medias/storage.service';


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
    private snackBar:MatSnackBar,
    private imgService:StorageService
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

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  public getimagen(filename:string,dir:string){
    return this.imgService.getImagen(filename,dir)
  }

}
