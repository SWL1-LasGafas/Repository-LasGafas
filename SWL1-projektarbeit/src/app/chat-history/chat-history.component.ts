import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements DoCheck {

  constructor() { }

  public content:string[]=[];

  scrollTop() { 
    console.log("Scrolling down");
    document.getElementById("myForm").scrollTop=document.getElementById("myForm").scrollHeight;
  }

  @Input()
  set chatHistory(value:string) {  // Jetzt ist es nicht mehr möglich, zweimal exakt den gleichen Text zu senden. Das empfinde ich aber als gute Flood Protection und belasse es deshalb
    console.log('set history');
    this.content.push(value);
  }

  ngDoCheck()
  {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
