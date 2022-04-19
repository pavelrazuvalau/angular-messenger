import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectedConversationModel } from '../../models/conversation.model';
import { ConversationMessageModel, IncomingMessage, MessageSendRequestModel } from '../../../core/models/message.model';
import { UserModel } from '../../../core/models/user.model';
import { SocketService } from 'src/app/core/services/socket.service';
import { ChatService } from 'src/app/chat/services/chat.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() selectedConversation: SelectedConversationModel | undefined;
  @Input() currentUser: UserModel | undefined;
  @Output() postMessage = new EventEmitter<MessageSendRequestModel>();

  newMessage: string = '';

  constructor(private socketService: SocketService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.socketService.connect(this.currentUser?.id as string);
    this.socketService.messageSubject.subscribe((message: IncomingMessage) => {
      const last_message = {
        recipient: message.recipient.username,
        sender: message.sender.username,
        timestamp: new Date().toISOString(),
        message: message.message,
        id: '111222',
      }
      this.selectedConversation?.messages.push(last_message)
    })
  }

  getUser(message: ConversationMessageModel) {
    return this.selectedConversation?.participants.find(user => user.id === message.sender);
  }

  onPostMessage() {
    this.postMessage.emit({
      message: this.newMessage,
      recipient: this.selectedConversation?.participants[1].id || ''
    });
    this.chatService.sendMessage(this.selectedConversation?.participants[1].id || '', this.newMessage).pipe(take(1)).subscribe();
    this.newMessage = '';
  }

}
