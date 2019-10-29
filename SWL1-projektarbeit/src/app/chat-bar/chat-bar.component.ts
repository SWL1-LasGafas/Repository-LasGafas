import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  constructor() { }

  chatText:string = '';
  postings = '';
  newline = "\n";

  ngOnInit() {
  }

  get chatMessage(): string {
    return this.chatText;
  }

  @Output()
  chatMessageChange = new EventEmitter<string>();

  @Input()
  set chatMessage(value) {
    this.chatText = value;
    this.chatMessageChange.emit(this.chatText);
  }

  mirror_text() {
    // console.log("typed \n");
    // Diese Funktion scheint es nicht zu brauchen. Das Spiegeln macht ngModel selbst
  }

  sendChat() {
    this.postings=this.postings+this.chatText+this.newline;
    alert('Nachricht erfolgreich versendet! '+this.chatMessage);
    this.chatMessage = this.postings;
    this.chatText = ''; // Hat keine Wirkung mehr
  }
}
