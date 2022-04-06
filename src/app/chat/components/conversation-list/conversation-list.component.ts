import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseConversationModel } from '../../models/conversation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  searchTerm: string = '';

  @Input() list: BaseConversationModel[] = [];
  @Input() selectedConversationId: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelectConversation(item: BaseConversationModel) {
   this.router.navigate(['/', 'chat', item.id])
  }

}
