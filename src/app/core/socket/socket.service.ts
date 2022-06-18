import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
type ROOMS =
  | 'ADMIN'

export interface IMessage {
  username: string;
  message: string;
}
@Injectable()
export class SocketService {
  baseUrlApi: string = environment.baseUrlApi;
  constructor(private http: HttpClient) { }

  getUsersSocketRoom(room: ROOMS): Observable<any> {
    let me = this;
    return me.http.get(`${me.baseUrlApi}/socket/user/${room}`);
  }

  getMessagesSocketRoom(): Observable<{ ok: boolean, messages: IMessage[] }> {
    let me = this;
    return me.http.get<{ ok: boolean, messages: IMessage[] }>(`${me.baseUrlApi}/socket/messages/admin`);
  }
}
