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
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @Input() selectedConversation!: SelectedConversationModel;
  @Input() currentUser: UserModel | null = null;
  @Output() postMessage = new EventEmitter<MessageSendRequestModel>();

  @ViewChild('lastMessageAnchor') lastMessageAnchor!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  newMessage: string = '';

  constructor(private scroller: ViewportScroller) {}

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
