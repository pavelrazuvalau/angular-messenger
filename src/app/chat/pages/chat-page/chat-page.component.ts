import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BaseConversationModel,
  SelectedConversationModel,
} from '../../models/conversation.model';
import { IncomingMessage, MessageSendRequestModel } from '../../../core/models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../core/models/user.model';
import { SocketService } from '../../../core/services/socket.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  selectedConversation: SelectedConversationModel | null = null;
  conversationList = this.chatService.getConversationList();
  currentUser: UserModel | null = null;

  foundUsers$: Observable<UserModel[]> | null = null;

  selectedUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private socketService: SocketService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const selectedUserId = params['id'];

      if (selectedUserId) {
        this.selectedUserId = selectedUserId;
        this.onSelectConversation(selectedUserId);
      } else {
        this.selectedUserId = null;
        this.selectedConversation = null;
      }
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.socketService.connect();
    this.socketService.messageSubject.subscribe((incomingMessage: IncomingMessage) => {
      if (this.selectedConversation?.participants[0].id === incomingMessage.sender.id) {
        this.selectedConversation = {
          ...this.selectedConversation,
          messages: this.selectedConversation.messages.concat({
            id: incomingMessage.id,
            message: incomingMessage.message,
            recipient: incomingMessage.recipient.id,
            sender: incomingMessage.sender.id,
            timestamp: incomingMessage.timestamp,
          })
        }
      }
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  onSearchUsers(searchTerm: string) {
    this.foundUsers$ = searchTerm ? this.chatService.searchUsers(searchTerm) : null;
  }

  onSelectUser(user: UserModel) {
    localStorage.setItem('selectedUser', JSON.stringify(user));

    this.router.navigate(['/', 'chat', user.id]);
  }

  onSelectConversation(id: string) {
    this.chatService.selectConversation(id).subscribe(conversation => {
      this.selectedConversation = conversation;
    })
  }

  onPostMessage(newMessage: MessageSendRequestModel) {
    this.selectedConversation?.messages.push({
      recipient: newMessage.recipient,
      sender: this.currentUser?.id,
      timestamp: new Date().toISOString(),
      message: newMessage.message,
      id: '111222',
    });

    this.chatService.sendMessage(newMessage).subscribe();
  }

}
