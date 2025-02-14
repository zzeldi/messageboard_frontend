import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from './message';
import {environment} from '../../../environments/environment';
import {map} from "rxjs/operators";

@Injectable()
export class MessageService {

  //todo error handling service

  constructor(private http: HttpClient) {
  }

  /**
   * retrives all the stored messages from the server
   */
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(environment.SERVER_URL + '/api/messages/')
      .pipe(map(response => Message.toArray(response)));
  }

  /**
   * sends the new message to the server
   * @param message
   */
  saveNewMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(environment.SERVER_URL + '/api/messages/' , message)
      .pipe(map(response => new Message(response)));
  }


}
