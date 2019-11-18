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
  //chatHistory: string; // Hier kommt die History rein
  set chatHistory(value:string) {
    console.log('set history');
    this.content.push(value);
    this.scrollTop(); 
  }

  ngDoCheck()
  {
    this.scrollTop(); 
  }

}
