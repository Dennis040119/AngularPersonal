import { Component, OnInit, Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class logincomponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}