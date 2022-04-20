import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

import { environment } from '../../../environments/environment';
import { IncomingMessage } from '../models/message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket | null = null;

  messageSubject = new Subject<IncomingMessage>();

  connect() {
    this.socket = io.connect(environment.socketUrl, {
      query: { auth_token: localStorage.getItem('token') },
    });

    this.socket.on('message', (message: IncomingMessage) => {
      this.messageSubject.next(message);
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}
