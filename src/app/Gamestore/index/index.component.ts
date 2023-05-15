import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

 

  tiles = [
    {text: 'BattleField 3', cols: 1, rows: 2, color: '#E36464',precio:'20.99',img:'../../assets/battlefield3.jpg'},
    {text: 'Destiny', cols: 1, rows: 2, color: 'lightgreen',precio:'20.99',img:'../../assets/Destiny.jpg'},
    {text: 'Gears of war 2', cols: 1, rows: 2, color: '#CB6A26',precio:'20.99',img:'../../assets/GearsOfWar2.jpg'},
    {text: 'HomeFront', cols: 1, rows: 2, color: '#909090',precio:'20.99',img:'../../assets/HomeFront.jpg'},
    {text: 'Mario Galaxy', cols: 1, rows: 2, color: '#4751CA',precio:'20.99',img:'../../assets/Mario Galaxy.jpg'},
    {text: 'six', cols: 1, rows: 2, color: '#DDBDF1',precio:'20.99',img:'../../assets/battlefield3.jpg'},
  ];

  constructor() {
    
  }

}
