import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollTop() {
    console.log("Scrolling down");
    document.getElementById("historyContainer").scrollTop=document.getElementById("historyContainer").scrollHeight;
  }

  @Input()
  chatHistory: string; // Hier kommt die History rein

}
