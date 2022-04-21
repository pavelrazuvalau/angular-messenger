import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseConversationModel } from '../../models/conversation.model';
import { UserModel } from '../../../core/models/user.model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  debounceSubject = new Subject<void>();

  @Input() foundUsers: UserModel[] | null = [];
  @Input() list: BaseConversationModel[] | null = [];
  @Input() selectedUserId!: string | null;

  @Output() searchUsers = new EventEmitter<string>();
  @Output() selectUser = new EventEmitter<UserModel>();

  ngOnInit(): void {
    this.debounceSubject.pipe(
      debounceTime(300),
    ).subscribe(() => {
      this.searchUsers.emit(this.searchTerm);
    })
  }

  ngOnDestroy() {
    this.debounceSubject.complete();
  }

  onSearchInput(): void {
    this.debounceSubject.next();
  }

  onSelectConversation(item: BaseConversationModel) {
    this.onSelectUser(item.participants[0]);
  }

  onSelectUser(user: UserModel) {
    this.selectUser.emit(user);
  }

}
