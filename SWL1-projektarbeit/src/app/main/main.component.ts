import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  chatText = 'Schreiben Sie hier Ihren Text.';
  postings = '';
  newline = "\n";

  ngOnInit() {
  }


  mirror_text() {
    // console.log("typed \n");
    // Diese Funktion scheint es nicht zu brauchen. Das Spiegeln macht ngModel selbst
  }

  sendChat() {
    this.postings=this.postings+this.chatText+this.newline;
    alert('Nachricht erfolgreich versendet!');
    this.chatText = 'Schreiben Sie hier Ihren Text.';
  }
}