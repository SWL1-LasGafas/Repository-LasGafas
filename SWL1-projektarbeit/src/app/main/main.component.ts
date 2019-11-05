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
  nickSet:boolean=false;

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
  }

}