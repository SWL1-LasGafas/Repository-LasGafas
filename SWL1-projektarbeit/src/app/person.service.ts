import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  myNickname:string = '';
  myOldNickname:string = '';
  nickInvalid:number = 0;

  public getNickname(): string {
    return this.myNickname;
  }

  // setter
  public setNickname(value:string) {
    this.myNickname = value;
  }

  public getNickInvalid():number {
    return this.nickInvalid;
  }

  public setNickInvalid(value:number) {
    this.nickInvalid=value;
  }

  public getOldNickname(): string {
    return this.myOldNickname;
  }

  // setter
  public setOldNickname(value:string) {
    this.myOldNickname = value;
  }

}
