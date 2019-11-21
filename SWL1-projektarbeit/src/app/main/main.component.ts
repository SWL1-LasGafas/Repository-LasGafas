import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public pService: PersonService) { }

  initialText:string="...";
  messageText:string="";
  historyText:string="";
  nickName:string="";
  nickSet:boolean=false;

  ngOnInit() {
  }

  systemMsg(msg:string) {
    this.historyText='<span class="systemMsg">'+msg+'</span>';
  }

  nickChange(event: any): void {
    console.log("Nickname Change");
    this.nickSet=true;
    if (this.pService.myOldNickname) { // Nur melden, wenn vorher ein Nickname gesetzt war
      this.systemMsg("Nickname von "+this.pService.myOldNickname+" hat geändert auf "+this.pService.myNickname+"!");
    }
  }

  chatMsg(event: any): void {
    // console.log(<string>event.toUpperCase()); // Ausgeblendet, weil das die Konsole überfüllt
    this.historyText=<string>event;
    this.messageText="";
  }

}