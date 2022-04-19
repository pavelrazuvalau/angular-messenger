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

  connect(token: string) {
    this.disconnect();

    this.socket = io(environment.apiUrl, { query: { auth_token: token } });

    this.socket?.on('message', (message: IncomingMessage) => {
      this.messageSubject.next(message);
    });
  }

  disconnect() {
    this.messageSubject.complete();
    this.socket?.disconnect();
  }
}
