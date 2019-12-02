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
  set chatHistory(value:string) {  // Jetzt ist es nicht mehr möglich, zweimal exakt den gleichen Text zu senden. Das empfinde ich aber als gute Flood Protection und belasse es deshalb
    console.log('set history');
    this.content.push(value);
    // Array auf definierten Wert kürzen
    if (this.content.length > this.historyLength) {
      console.log('History gekürzt von '+this.content.length+' auf '+this.historyLength+' Elemente')
      this.content.shift();
    }
    
    this.chatService.getHistory().subscribe(
      (response:Message)=>{
      console.log('REST server gave back'+response);
      }
    )
  }

  ngDoCheck()
  {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
