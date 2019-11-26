import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }
  
  historyMaxLength:number=50;

  public getHistoryMaxLength():number {
    return this.historyMaxLength;
  }

}
