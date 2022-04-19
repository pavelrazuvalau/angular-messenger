import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseConversationModel } from '../../models/conversation.model';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat/services/chat.service';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  searchTerm: string = '';
  users = this.chatService.usersSubject;

  @Input() list: BaseConversationModel[] = [];
  @Input() selectedConversationId: string | undefined;

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {

  }

  onSearchInput(): void {
    this.chatService.searchUsers(this.searchTerm);
  }

  onSelectConversation(item: BaseConversationModel) {
    this.router.navigate(['/', 'chat', item.id])
  }

  onSelectUser() {
    // ToDo При кликле по юзеру, нужно создать с ним чат, но я пока не знаю, как это сделать. Такого в апи нет)
    this.router.navigate(['chat']);
  }

}
