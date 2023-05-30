
import { Router } from '@angular/router';
import {CommonModule } from '@angular/common';
import {Component, NgModule, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Primera_App';
  key = localStorage.getItem("key")

  constructor(
    
    private router: Router,
    
  ) {
   
  }
}
