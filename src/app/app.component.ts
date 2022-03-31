import { Component } from '@angular/core';
import { BaseConversationModel, SelectedConversationModel } from '../models/conversation.model';
import { selectedConversationsMock } from '../mocks/selected-conversations.mock';
import { MessageSendRequestModel } from '../models/message.model';
import { currentUserMock } from '../mocks/current-user.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-messenger';
  selectedConversation: SelectedConversationModel | undefined;

  onSelectConversation(conversation: BaseConversationModel) {
    this.selectedConversation = selectedConversationsMock.find(item => item.id === conversation.id);
  }

  onPostMessage(newMessage: MessageSendRequestModel) {
    this.selectedConversation?.messages.push({
      recipient: newMessage.recipient,
      sender: currentUserMock.id,
      timestamp: new Date().toISOString(),
      message: newMessage.message,
      id: '111222',
    },)
  }

}
