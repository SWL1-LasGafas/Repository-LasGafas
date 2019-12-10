import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nick-list',
  templateUrl: './nick-list.component.html',
  styleUrls: ['./nick-list.component.css']
})
export class NickListComponent implements OnInit {

  constructor() { }

  nickList:string[];

  ngOnInit() {
  }

}
