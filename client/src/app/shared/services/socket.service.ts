import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  constructor() {
    this.socket = io(env.base_url);
  }

  init() {
    if (this.socket.disconnected) {
      this.socket = io(env.base_url);
    }
  }
  listen(eventName: string): Observable<void> {
    let observable = new Observable<void>(observer => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
