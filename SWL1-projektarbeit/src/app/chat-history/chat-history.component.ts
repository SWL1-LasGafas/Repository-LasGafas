import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements DoCheck {

  constructor() { }

  public content:string[]=[];

  scrollTop() { // Funktioniert, aber die Auslösung ist ein Problem, weil es hier nicht so ist, wie in der Lösung
    console.log("Scrolling down");
    document.getElementById("myForm").scrollTop=document.getElementById("myForm").scrollHeight;
  }

  @Input()
  //chatHistory: string; // Hier kommt die History rein
  set chatHistory(value:string) {
    console.log('set history');
    this.content.push(value);
    this.scrollTop(); // funktioniert immer noch nicht bzw. scrollt nur bis zur Position, die es war, als der neue Text noch nicht drin war. Und weiter scrollen als der aktuelle Inhalt lang ist, macht das textarea nicht mit.
  }

  ngDoCheck()
  {
    this.scrollTop(); 
  }

}
