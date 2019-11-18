import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  constructor(public pService: PersonService) { }

  chatText:string = '';
  newline:string = "\n";
  public nickName:string = "";
  isOK:boolean=false;
  tstamp:string='';

  ngOnInit() {
  }

  checkMsg(value:string):boolean {
    console.log("checking "+value);
    if (value.length>0)
    {
      this.isOK=true;
    }
    else
    {
      this.isOK=false;
    }
    return this.isOK;
  }

  get chatMessage(): string {
    return this.chatText;
  }
  
  @Output()
  chatMessageChange = new EventEmitter<string>();

  @Input()
  set chatMessage(value) {
    if (this.checkMsg(value))
    {
      this.chatText = value;
      this.chatMessageChange.emit(this.chatText);
    }
    else {
      console.log("Chat-Message ungültig!");
    }
  }

  checkNick() {
    this.nickName = this.pService.myNickname;
  }

  sendChat() {

    this.nickName = this.pService.myNickname;
    this.tstamp = "dummydate";

    // Hier findet noch die Reinigung des Textes statt. Aus Speicherspargründen hier, damit der kürzestmögliche Text verschickt wird.
    if (this.checkMsg(this.chatText.trim())) // Falls überhaupt was drin steht, natürlich
    {
      this.chatMessage = '<span class="myNick">'+this.nickName+": </span>"+this.newline+'<span class="tstamp">'+this.tstamp+'</span>'+this.newline+'<span class="chatText">'+this.chatText.trim()+'</span>'+this.newline; // Neu nur noch den einen Text rüberschicken und in main zusammenbauen
    }
    this.chatText = '';
  }
}
