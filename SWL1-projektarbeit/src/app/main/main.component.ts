import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

//  chatText = '';
//  postings = '';
//  newline = "\n";
  initialText:string="...";
  messageText:string="";
  historyText:string="";

  ngOnInit() {
  }

  chatMsg(event: any): void {
    // console.log(<string>event.toUpperCase()); // Ausgeblendet, weil das die Konsole grausam zuballert
    this.historyText=<string>event;
    this.messageText="";
  }

//  mirror_text() {
    // console.log("typed \n");
    // Diese Funktion scheint es nicht zu brauchen. Das Spiegeln macht ngModel selbst
//  }

//  sendChat() {
//    this.postings=this.postings+this.chatText+this.newline;
//    alert('Nachricht erfolgreich versendet!');
//    this.chatText = '';
//  }
}