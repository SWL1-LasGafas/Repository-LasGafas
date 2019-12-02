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

  // Diese Funktion hängt führende Nullen an. Mit Berücksichtigung Vorzeichen
  // adaptiert von https://gist.github.com/endel/321925f6cafa25bbfbde
  pad = function(val:any,size:number):string {
    var sign = Math.sign(val) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(val)]).join('0').slice(-size);
  }

  sendChat() {

    var dt = new Date();
    var monthnames:string[]=["Januar","Februar","März","April","Mai","Juni","Juli", "August", "September", "Oktober", "November", "Dezember"];

    // Test für die Funktion pad(). Könnte für automatisierte Tests verwendet werden.
    //console.log("Funktionstest pad: -5-->"+this.pad(-5,2)+" und 8-->"+this.pad(8,2));

    this.nickName = this.pService.myNickname;
    this.tstamp = this.pad(dt.getDate(),1)+'. '+ monthnames[dt.getMonth()]+ ' '+ dt.getFullYear()+', '+this.pad(dt.getHours(),2)+':'+this.pad(dt.getMinutes(),2)+' Uhr'; //Hier wird das Datum formatiert. Layout nach Wunsch des Kunden (2. Dez 2019)
    // Hier finden Reinigung und Montage des Textes statt.
    if (this.checkMsg(this.chatText.trim())) // Falls überhaupt etwas drin steht, natürlich
    {
      this.chatMessage = '<span class="myNick"><strong>'+this.nickName+": </strong></span>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>'+this.tstamp+'</small></span>'+this.newline+'<span class="chatText">'+this.chatText.trim()+'</span>'+this.newline; // Neu nur noch den einen Text rüberschicken und in main zusammenbauen
    }
    this.chatText = '';
  }
}
