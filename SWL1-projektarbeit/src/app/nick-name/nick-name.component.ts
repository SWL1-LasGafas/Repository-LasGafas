import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    if (value.length >= 4) {
      if (value.match("^([a-z]|[A-Z]|[ä,ö,ü,Ä,Ö,Ü,ç,è,é,à])*$")) {
        this.isOK = true;
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
    if (this.checkNickname(this.nickName)) {
      this.pService.myNickname = this.nickName;
      console.log("Nickname=" + this.nickName);
      this.nickNameChange.emit(this.nickName);
    }
    else {
      console.log("Nickname " + this.nickName + " ungültig!");
      alert("Nickname ungültig. Bitte nur Buchstaben verwenden!");
    }
  }

}
