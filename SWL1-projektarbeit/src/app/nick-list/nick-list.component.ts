import { Component, OnInit, Input } from '@angular/core';
import { Nickname } from '../nickname'
import { stringify } from 'querystring'; // Wohl jetzt überflüssig, weil nicht mehr mit <string> gearbeitet wird


@Component({
  selector: 'app-nick-list',
  templateUrl: './nick-list.component.html',
  styleUrls: ['./nick-list.component.css']
})
export class NickListComponent implements OnInit {

  constructor() { }

  activeNicks:Nickname[]=[];

  ngOnInit() {
  }

  @Input() 
  set nickObj(nickListObj: Nickname) {
//    if (nickListObj.name != '') { // Irgendwie landet immer erst mal ein leeres Objekt hier, das man abblocken muss
      console.log('nick-list: ' + nickListObj.name + ' in Liste eingefügt');
      this.activeNicks.push(nickListObj);
      console.log('Nick-Array: '+this.activeNicks.toString());
//    }
/*    else {
      console.log('nick-list: leeres Objekt ignoriert: '+nickListObj.name);
    } */
  }


}
