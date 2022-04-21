import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SelectedConversationModel } from '../../models/conversation.model';
import { ConversationMessageModel, MessageSendRequestModel } from '../../../core/models/message.model';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @Input() selectedConversation!: SelectedConversationModel;
  @Input() currentUser: UserModel | null = null;
  @Output() postMessage = new EventEmitter<MessageSendRequestModel>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  newMessage: string = '';

  ngAfterViewChecked() {
    this.scrollContainer.nativeElement.scrollTo(0, this.scrollContainer.nativeElement.scrollHeight);
  }

  getUser(message: ConversationMessageModel) {
    return this.selectedConversation.participants.find(user => user.id === message.sender);
  }

  onPostMessage() {
    this.postMessage.emit({
      message: this.newMessage,
      recipient: this.selectedConversation.participants[0].id || ''
    });
    this.newMessage = '';
  }

}
