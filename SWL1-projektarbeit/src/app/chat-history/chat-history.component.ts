import { Component, DoCheck, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})


export class ChatHistoryComponent implements DoCheck {

  constructor() { }

  public content:string[]=[];
  public historyLength:number = 50; // TODO: Definition globaler Konstanten in angular.js muss noch nachgeschlagen werden. Gibt mehrere sehr komplizierte Ansätze, die nicht wirklich sinnvoll scheinen

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
  }

  ngDoCheck()
  {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
