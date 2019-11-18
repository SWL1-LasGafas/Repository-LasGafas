import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  initialText:string="...";
  messageText:string="";
  historyText:string="";
  nickName:string="";
  nickSet:boolean=false;

  scrollTop() {
    var pos=document.getElementById("historyContainer").scrollHeight;
    console.log("Scrolling down to "+pos);
    document.getElementById("historyContainer").scrollTop=pos;
  }

  ngOnInit() {
  }

  nickChange(event: any): void {
    console.log("Nickname Change");
    this.nickSet=true;
  }

  chatMsg(event: any): void {
    // console.log(<string>event.toUpperCase()); // Ausgeblendet, weil das die Konsole grausam zuballert
    this.historyText=this.historyText+<string>event;
    this.messageText="";
    this.scrollTop(); // Hier ist das Problem, dass das an der Stelle zu früh ist, aber drüben auf chat-history das Ganze nicht dem entspricht, was in der Lösung gemacht wurde. Es löst keinen change-Event aus, dort.
  }

}