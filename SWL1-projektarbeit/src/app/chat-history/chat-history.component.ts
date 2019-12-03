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

  public content: string[] = [];
  public historyLength: number = this.cService.historyMaxLength; // Bezieht Infos aus dem Configuration Service
  newline:string = "\n";
  tstamp:string='';
  nickName:string = "";


  scrollTop() {
    console.log("Scrolling down");
    document.getElementById("myForm").scrollTop = document.getElementById("myForm").scrollHeight;
  }

  // Diese Funktion hängt führende Nullen an. Mit Berücksichtigung Vorzeichen
  // adaptiert von https://gist.github.com/endel/321925f6cafa25bbfbde
  pad = function (val: any, size: number): string {
    var sign = Math.sign(val) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(val)]).join('0').slice(-size);
  }

  @Input()
  set chatHistory(value: Message) {
    // Der Mechanismus mit dem Input der Komponente wird grundsätzlich beibehalten. So wird schon mal jedes Mal dann die History aktuell, wenn der Anwender einen Beitrag schreibt
    // Hier wird der neue Beitrag auf den REST-Server hochgeladen
    console.log('History add: '+this.chatService.addToHistory(value));

    // Die vom REST-Server zusammengebaute Information wird wieder heruntergezogen und weiterverarbeitet
    this.chatService.getHistory().subscribe(
      (response: Message) => {
        console.log('REST server gave back ' + response);
        // Hier muss unser Array aus der Serverantwort zusammengebaut werden.
        
        var dt = new Date(response[0].date); // wandert in chat-history
        var monthnames:string[]=["Januar","Februar","März","April","Mai","Juni","Juli", "August", "September", "Oktober", "November", "Dezember"]; // wandert in chat-history
    
        // Test für die Funktion pad(). Könnte für automatisierte Tests verwendet werden.
        //console.log("Funktionstest pad: -5-->"+this.pad(-5,2)+" und 8-->"+this.pad(8,2));
    
        this.nickName = response[0].nickname;
        this.tstamp = this.pad(dt.getDate(),1)+'. '+ monthnames[dt.getMonth()]+ ' '+ dt.getFullYear()+', '+this.pad(dt.getHours(),2)+':'+this.pad(dt.getMinutes(),2)+' Uhr'; //Hier wird das Datum formatiert. Layout nach Wunsch des Kunden (2. Dez 2019)

        // Hier findet die Montage des Textes statt.
        this.content.push('<span class="myNick"><strong>'+this.nickName+": </strong></span>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>'+this.tstamp+'</small></span>'+this.newline+'<span class="chatText">'+response[0].message+'</span>'+this.newline);
        
      }
    )

    // Formatierung aller Elemente aus dem REST-Service
    // value = '<span class="myNick"><strong>'+this.nickName+": </strong></span>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>'+this.tstamp+'</small></span>'+this.newline+'<span class="chatText">'+this.chatText.trim()+'</span>'+this.newline;

    console.log('set history');
    //this.content.push(value.);
    // Array auf definierten Wert kürzen
    if (this.content.length > this.historyLength) {
      console.log('History gekürzt von ' + this.content.length + ' auf ' + this.historyLength + ' Elemente')
      this.content.shift();
    }

  }

  ngDoCheck() {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
