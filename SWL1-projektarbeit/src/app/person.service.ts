import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  myNickname:string = '';

  public getNickname(): string {
    return this.myNickname;
  }

  // setter
  public setNickname(value:string) {
    this.myNickname = value;
  }

}
