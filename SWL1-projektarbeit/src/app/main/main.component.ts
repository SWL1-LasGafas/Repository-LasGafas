import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  myVariable = 'Schreibe einen Text...';
  postings = '';
  newline = "\n\r";

  ngOnInit() {
  }


  mirror_text() {
    // console.log("typed \n");
  }

  sendChat() {
    this.postings=this.postings+this.myVariable+this.newline;
    alert('Versendet!');
  }
}