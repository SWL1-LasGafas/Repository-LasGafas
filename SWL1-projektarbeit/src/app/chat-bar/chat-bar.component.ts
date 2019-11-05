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
  // postings = ''; 
  newline:string = "\n";
  public nickName:string = "";
  isOK:boolean=false;

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

  mirror_text() {
    // console.log("typed \n");
    // Diese Funktion scheint es nicht zu brauchen. Das Spiegeln macht ngModel selbst
  }

  sendChat() {
    // this.postings=this.postings+this.chatText+this.newline;  // postings wird eigentlich nicht mehr benötigt.

    this.nickName = this.pService.myNickname;

    // Hier findet noch die Reinigung des Textes statt. Aus Speicherspargründen hier, damit der kürzestmögliche Text verschickt wird.
    if (this.checkMsg(this.chatText.trim())) // Falls überhaupt was drin steht, natürlich
    {
      this.chatMessage = this.nickName+": "+this.chatText.trim()+this.newline; // Neu nur noch den einen Text rüberschicken und in main zusammenbauen
    }
    this.chatText = '';
  }
}
