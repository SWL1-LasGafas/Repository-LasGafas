import { Component, DoCheck, Input } from '@angular/core';
//import { AppComponent } from '../app.component';
import { ConfigurationService } from '../configuration.service';
import { ChatserverService } from '../chatserver.service';
import { Message } from '../message'

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})


export class ChatHistoryComponent implements DoCheck {

  constructor(public cService: ConfigurationService, public chatService: ChatserverService) { }

  public content:string[]=[];
  public historyLength:number = this.cService.historyMaxLength; // Bezieht Infos aus dem Configuration Service

  scrollTop() { 
    console.log("Scrolling down");
    document.getElementById("myForm").scrollTop=document.getElementById("myForm").scrollHeight;
  }

  @Input()
  set chatHistory(value:string) {  
    // Der Mechanismus mit dem Input der Komponente wird grundsätzlich beibehalten. So wird schon mal jedes Mal dann die History aktuell, wenn der Anwender einen Beitrag schreibt
    // Hier wird der neue Beitrag auf den REST-Server hochgeladen


    // Die vom REST-Server zusammengebaute Information wird wieder heruntergezogen und weiterverarbeitet
    this.chatService.getHistory().subscribe(
      (response:Message)=>{
      console.log('REST server gave back '+response[0].nickname+" "+response[0].date+" "+response[0].message);
      // Hier muss unser Array aus der Serverantwort zusammengebaut werden.
      this.content["nickname"]=response.nickname;
      this.content["date"]=response.date;
      this.content["message"]=response.message;
      }
    )
    
    // Formatierung aller Elemente aus dem REST-Service
    // value = '<span class="myNick"><strong>'+this.nickName+": </strong></span>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>'+this.tstamp+'</small></span>'+this.newline+'<span class="chatText">'+this.chatText.trim()+'</span>'+this.newline;

    console.log('set history');
    this.content.push(value);
    // Array auf definierten Wert kürzen
    if (this.content.length > this.historyLength) {
      console.log('History gekürzt von '+this.content.length+' auf '+this.historyLength+' Elemente')
      this.content.shift();
    }
    
  }

  ngDoCheck()
  {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
