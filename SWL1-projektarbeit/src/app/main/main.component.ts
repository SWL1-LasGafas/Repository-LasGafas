import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public pService: PersonService) { }

  initialText: string = "...";
  messageText: string = "";
  historyText: string = "";
  nickName: string = "";
  nickSet: boolean = false;
  errorMsg: string = '';

  ngOnInit() {
  }

  systemMsg(msg: string) {
    this.historyText = '<span class="systemMsg">' + msg + '</span>';
  }

  nickChange(event: any): void {
    console.log("Nickname Change");
    if (this.pService.nickInvalid < 1) { 
      if (this.pService.myOldNickname) { // Nur melden, wenn vorher ein Nickname gesetzt war
        console.log("Nick gesetzt und OK!");
        this.systemMsg("** " + this.pService.myOldNickname + " ändert Nickname auf " + this.pService.myNickname + " **");
      }
      this.errorMsg = '';
      this.nickSet = true;
    }
    else {
      console.log('Invalid Nick detected! '+this.pService.nickInvalid);
      this.errorMsg = 'Nickname ungültig. Bitte auch Buchstaben verwenden! Keine Leerzeichen! Mindestens 4, Maximal 10 Zeichen!';  // systemMsg geht nicht, weil nicht davon ausgegangen werden kann, dass die chathistory überhaupt schon sichtbar ist.
    }
  }

  chatMsg(event: any): void {
    // console.log(<string>event.toUpperCase()); // Ausgeblendet, weil das die Konsole überfüllt
    this.historyText = <string>event;
    this.messageText = "";
  }

}