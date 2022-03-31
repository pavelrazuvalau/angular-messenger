import { Component, Input, OnInit } from '@angular/core';
import { ConversationMessageModel } from '../../../models/message.model';
import { UserModel } from '../../../models/user.model';
import { currentUserMock } from '../../../mocks/current-user.mock';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ConversationMessageModel | undefined;
  @Input() user: UserModel | undefined;

  currentUser = currentUserMock;

  constructor() { }

  ngOnInit(): void {
  }

}
