import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-nick-name',
  templateUrl: './nick-name.component.html',
  styleUrls: ['./nick-name.component.css']
})
export class NickNameComponent implements OnInit {

  constructor(public pService: PersonService) { }

  ngOnInit() {
  }

  nickName: string = "";
  isOK: boolean = false;

  checkNickname(value: string): boolean {

    this.isOK = false;
    var regex = '^[a-zA-Z]+.*$';
    var notallowed = '[ ]';

    if (value.length >= 4) {
      console.log('Nick lang genug!');
//      if (value.match("^([a-z]|[A-Z]|[ä,ö,ü,Ä,Ö,Ü,ç,è,é,à])*$")) {
      if (value.match(regex)) {
        console.log('Nick Regex OK!');
        if (value.search(notallowed)>0) // Zweite Suche nach dem nicht erlaubten Zeichen, weil ein einzelnes Regex nicht so wirklich geklappt hat
        {
          console.log('Nick enthält '+notallowed)
          this.isOK = false;
        }
        else {
          this.isOK = true;
        }
      }
    }
    else {
      this.isOK = false;
    }

    return this.isOK;

  }

  @Output()
  nickNameChange = new EventEmitter<string>();

  setNickname() {
    this.nickName=this.nickName.trim();
    if (this.checkNickname(this.nickName)) {
      this.pService.myOldNickname = this.pService.myNickname;
      this.pService.myNickname = this.nickName;
      console.log("Nickname von " +this.pService.myOldNickname + ' nach ' + this.nickName);
      this.nickNameChange.emit(this.nickName);
    }
    else {
      console.log("Nickname " + this.nickName + " ungültig!");
      alert("Nickname ungültig. Bitte auch Buchstaben verwenden! Leerzeichen sind nicht erlaubt! Mindestens 4 Zeichen!");
    }
  }

}
