import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { VideoJuegoServiceService } from '../services/video-juego-service.service';
import { EnumService } from '../services/enum.service';


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

  constructor(
    private router:Router,
    private Enum:EnumService
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

}
