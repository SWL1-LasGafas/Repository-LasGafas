import { Component, DoCheck, Input, OnInit } from '@angular/core';
//import { AppComponent } from '../app.component';
import { ConfigurationService } from '../configuration.service';
import { PersonService } from '../person.service';
import { ChatserverService } from '../chatserver.service';
import { Message } from '../message'
import { randomBytes } from 'crypto';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})


export class ChatHistoryComponent implements DoCheck {

  constructor(public cService: ConfigurationService, public chatService: ChatserverService, public pService: PersonService,) { }

  ngOnInit() {
    setInterval(() => { 
      this.getHistory(); 
      this.scrollTop(); // Scrolling hier nützt nichts. In chat-history.component.html gelöst nach Lösung 3 Ch. Baumgarten.
    }, 2000); // Polling
  }

  public content: string[] = [];
  public historyLength: number = this.cService.historyMaxLength; // Bezieht Infos aus dem Configuration Service
  newline: string = "\n";
  tstamp: string = '';
  nickName: string = "";


  scrollTop() {
    console.log("Scrolling down");
    document.getElementById("myForm").scrollTop = document.getElementById("myForm").scrollHeight; // möglicherweise wird die Funktion mit der anpassung in chat-history.component.html überflüssig
  }

  // Diese Funktion hängt führende Nullen an. Mit Berücksichtigung Vorzeichen
  // adaptiert von https://gist.github.com/endel/321925f6cafa25bbfbde
  pad = function (val: any, size: number): string {
    var sign = Math.sign(val) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(val)]).join('0').slice(-size);
  }

  getHistory() {
    console.log('Start lesen History...');
    // Die vom REST-Server zusammengebaute Information wird wieder heruntergezogen und weiterverarbeitet
    this.content = []; // Der Server hat alle Infos und schickt sie wieder rüber. Derzeit zumindest. gup 
    this.chatService.getHistory().subscribe(
      (response: Message) => {
        console.log('REST server gave back ' + response);
        // Hier muss unser Array aus der Serverantwort zusammengebaut werden.

        var monthnames: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]; // wanderte in chat-history
        var nickClass: string[] = ['myNick','nick1','nick2','nick3'];
        var nickIndex: number = 1;

        // Test für die Funktion pad(). Könnte für automatisierte Tests verwendet werden.
        //console.log("Funktionstest pad: -5-->"+this.pad(-5,2)+" und 8-->"+this.pad(8,2));
        var i = 0;
        try {
          while (response[i].date) { // Das date wird vom Server gesetzt und sollte so bei jedem Beitrag vorhanden sein.
            console.log('Add history element ' + i);
            var dt = new Date(response[i].date); // Jedes Mal mit dem Datum des Beitrags initialisiert
            this.nickName = response[i].nickname;
            this.tstamp = this.pad(dt.getDate(), 1) + '. ' + monthnames[dt.getMonth()] + ' ' + dt.getFullYear() + ', ' + this.pad(dt.getHours(), 2) + ':' + this.pad(dt.getMinutes(), 2) + ' Uhr'; //Hier wird das Datum formatiert. Layout nach Wunsch des Kunden (2. Dez 2019)

            // Hier findet die Montage des Textes statt.
            if (this.nickName == this.pService.myNickname)
            {
              nickIndex = 0;
            }
            else {
              nickIndex = 2; // Hier müsste dann irgendwas random zugewiesen sein. Das Problem mit https://angular.io/guide/security#xss besteht weiterhin!
            }
            this.content.push('<span class="'+nickClass[nickIndex]+'"><strong>' + this.nickName + ": </strong></span>" + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tstamp"><small>' + this.tstamp + '</small></span>' + this.newline + '<span class="chatText">' + response[i].message + '</span>' + this.newline);
            dt = null; // Versuch, ein Speicherloch zu verhindern. gup
            i++;

            // Array auf definierten Wert kürzen
            if (this.content.length > this.historyLength) {
              console.log('History gekürzt von ' + this.content.length + ' auf ' + this.historyLength + ' Elemente')
              this.content.shift(); // Problem: Es muss evtl. viel mehr gekürzt werden, weil das Array viel länger ist. TODO! 
            }

          }
        }
        catch {
          // Eigentlich nur gebaut, um den Fehler wegen leerem date herauszubekommen gup
        }
      }
    )
    console.log('Ende lesen History...');
  }

  @Input()
  set chatHistory(chatMsgObj: Message) {
    console.log('chat-history: @Input starts');
    /*
    // Der Mechanismus mit dem Input der Komponente wird grundsätzlich beibehalten. So wird schon mal jedes Mal dann die History aktuell, wenn der Anwender einen Beitrag schreibt
    // Hier wird der neue Beitrag auf den REST-Server hochgeladen
    if (chatMsgObj) { // Es gibt leere Einträge auf dem Chatserver. Das lässt darauf schliessen, dass POST-Requests mit leerem Zeug kommen.
      console.log('Start schreiben History...');
      this.chatService.addToHistory(chatMsgObj).subscribe( // Es schreibt bislang nur den ersten Eintrag, danach kommt nicht mehr viel in den REST-Server rein
        (response: Message) => {
          console.log('History add: ' + response.message);
        }
      )
      console.log('Ende schreiben History...');
    }
    */



  }

  ngDoCheck() {
    this.scrollTop();  // Verhalten etwas suboptimal, weil es jetzt bei jedem einzelnen Tastendruck im Eingabefeld scrollt. Aber es scrollt, immerhin.
  }

}
