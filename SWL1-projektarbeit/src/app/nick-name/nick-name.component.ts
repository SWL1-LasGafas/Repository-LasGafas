import { Component, OnInit, Output, EventEmitter} from '@angular/core'; 
import { PersonService } from '../person.service';

@Component({
  selector: 'app-nick-name',
  templateUrl: './nick-name.component.html',
  styleUrls: ['./nick-name.component.css']
})
export class NickNameComponent implements OnInit {

  constructor(public pService: PersonService) {  }

  ngOnInit() {
  }

  nickName:string = "";

  setNickname() {
    this.pService.myNickname = this.nickName;
    console.log("Nickname="+this.nickName);
  }

}
