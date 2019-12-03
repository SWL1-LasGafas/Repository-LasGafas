import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../person.service';
import { Message } from '../message'

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  constructor(public pService: PersonService) { }

  chatText:string = ''; // Enthält nur die Message aus dem Feld
  chatMsgObj:Message = new Message(); // Enthält nickname und message (kein date! Das macht der Server dann!)
  newline:string = "\n"; // Wandert später in chat-history rüber
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

  get chatMessage(): Message {
    return this.chatMsgObj;
  }
  
  @Output()
  chatMessageChange = new EventEmitter<Message>();

  @Input()
  set chatMessage(msgObj:Message) {

    //if (this.checkMsg(msgObj.message)) // Nochmals Prüfung der Chat-Message. Vermutlich völlig überflüssig (gup)
    {
      this.chatMessageChange.emit(msgObj);
    }
    /* else {
      console.log("Chat-Message ungültig!");
    } */
  }

  checkNick() {
    this.nickName = this.pService.myNickname;
  }

  // Diese Funktion hängt führende Nullen an. Mit Berücksichtigung Vorzeichen // wandert in chat-history
  // adaptiert von https://gist.github.com/endel/321925f6cafa25bbfbde
  pad = function(val:any,size:number):string {
    var sign = Math.sign(val) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(val)]).join('0').slice(-size);
  }

  sendChat() {
    
    var dt = new Date(); // wandert in chat-history
    var monthnames:string[]=["Januar","Februar","März","April","Mai","Juni","Juli", "August", "September", "Oktober", "November", "Dezember"]; // wandert in chat-history

    // Test für die Funktion pad(). Könnte für automatisierte Tests verwendet werden.
    //console.log("Funktionstest pad: -5-->"+this.pad(-5,2)+" und 8-->"+this.pad(8,2));

    this.nickName = this.pService.myNickname;
    this.tstamp = this.pad(dt.getDate(),1)+'. '+ monthnames[dt.getMonth()]+ ' '+ dt.getFullYear()+', '+this.pad(dt.getHours(),2)+':'+this.pad(dt.getMinutes(),2)+' Uhr'; //Hier wird das Datum formatiert. Layout nach Wunsch des Kunden (2. Dez 2019)
    // Hier finden Reinigung und Montage des Textes statt.
    if (this.checkMsg(this.chatText.trim())) // Falls überhaupt etwas drin steht, natürlich
    {
      // Hier wird neu nur noch ein Message-Objekt erstellt und der gesamte Zusammenbau findet erst in chat-history statt, wo alles über den REST-Service geht.
      this.chatMsgObj.nickname = this.pService.myNickname;
      this.chatMsgObj.message = this.chatText.trim();
      this.chatMessage = this.chatMsgObj;

      // Wandert in chat-history: this.chatMessage = '<span class="myNick"><strong>'+this.nickName+": </strong></span>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>'+this.tstamp+'</small></span>'+this.newline+'<span class="chatText">'+this.chatText.trim()+'</span>'+this.newline; // Neu nur noch den einen Text rüberschicken und in main zusammenbauen
    }
    this.chatText = '';
  }
}
