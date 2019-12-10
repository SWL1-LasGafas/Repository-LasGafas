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

  activeNicks: String[] = [];

  ngOnInit() {
    setInterval(() => {
      this.updateNicks();
    }, 5000); // Polling
  }

  updateNicks()
  {
    // Wie's aussieht müssen wir das auch noch in einen Service speichern und von dort pollen
    console.log('polling for nicks');
    this.activeNicks = this.activeNicks.sort();
  }

  @Input() 
  set nickObj(activeNicks: Nickname[]) {
    // Hier kann man die Liste noch verschönern und es wird eine Stringliste draus gemacht, weil es sonst wieder Probleme gibt mit Sortieren
    activeNicks.forEach(value => {
      if (value.active) {
        this.activeNicks.push(value.name);
        this.activeNicks = this.activeNicks.sort();
      }
    });

    // Ziel wäre gewesen, das Array hier zusammenzubauen. Aber das wollte einfach nicht funktionieren. Jetzt liefert das halt die main-Komponente fertig an.
/*    if (nickListObj.name != '') { // Irgendwie landet immer erst mal ein leeres Objekt hier, das man abblocken muss 
      console.log('nick-list: ' + nickListObj.name + ' in Liste eingefügt');
      this.=nickListObj; // Das ist zwar falsch, funktioniert aber
      console.log('Nick-Array: '+this.activeNicks.toString());
    }
/*    else {
      console.log('nick-list: leeres Objekt ignoriert: '+nickListObj.name);
    } */
  }
}
