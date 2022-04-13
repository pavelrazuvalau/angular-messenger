import { Component, OnInit } from '@angular/core';
import { BaseConversationModel, SelectedConversationModel } from '../../models/conversation.model';
import { MessageSendRequestModel } from '../../../core/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  selectedConversation: SelectedConversationModel | undefined;
  conversationList: BaseConversationModel[] = this.chatService.getConversationList();
  currentUser: UserModel = this.userService.getCurrentUser();

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const conversationId = params['id'];

      if (conversationId) {
        this.onSelectConversation(conversationId);
      }
    });

    console.log(this.route.snapshot.data);
  }

  onSelectConversation(id: string) {
    this.selectedConversation = this.chatService.selectConversation(id);
  }

  onPostMessage(newMessage: MessageSendRequestModel) {
    this.selectedConversation?.messages.push({
      recipient: newMessage.recipient,
      sender: this.currentUser?.id,
      timestamp: new Date().toISOString(),
      message: newMessage.message,
      id: '111222',
    },)
  }

}
