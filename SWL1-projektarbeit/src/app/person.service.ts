import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  myNickname:string = '';
  myOldNickname:string = '';

  public getNickname(): string {
    return this.myNickname;
  }

  // setter
  public setNickname(value:string) {
    this.myNickname = value;
  }

  public getOldNickname(): string {
    return this.myOldNickname;
  }

  // setter
  public setOldNickname(value:string) {
    this.myOldNickname = value;
  }

}
