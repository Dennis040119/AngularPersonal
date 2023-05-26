import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css']
})
export class LogueoComponent implements OnInit {
  email!: string;
  password!: string;

  constructor() {}

  ngOnInit(): void {
    localStorage.setItem("Username","usuario01")
  }

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}
