import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../app/message'

@Injectable({
  providedIn: 'root'
})
export class ChatserverService {

  constructor(public http: HttpClient) { }

  actionUrl: string = 'https://swl1-lasgafas-testapp.herokuapp.com/api/history';

  public addToHistory(message: Message): Observable<Message> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Message>(this.actionUrl, message, options);
  }

  public getHistory(): Observable<Message> {
    return this.http.get<Message>(this.actionUrl);
  }


}
