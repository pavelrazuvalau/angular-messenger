import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, take, withLatestFrom } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import {
  BaseConversationModel,
  ConversationListResponseModel,
  SelectedConversationModel,
} from '../models/conversation.model';
import { UserService } from '../../core/services/user.service';
import { MessageSendRequestModel } from '../../core/models/message.model';

@Injectable()
export class ChatService {
  public usersSubject = new ReplaySubject<UserModel[]>();

  constructor(private http: HttpClient, private userService: UserService) { }

  getConversationList(): Observable<BaseConversationModel[]> {
    return this.http.get<ConversationListResponseModel>('conversation/all').pipe(
      withLatestFrom(this.userService.getCurrentUser() as Observable<UserModel>),
      map(([response, currentUser]) => response.conversations.map(conversation => ({
        ...conversation,
        participants: conversation.participants.sort((a, b) => a.id !== currentUser.id ? -1 : 1)
      })))
    );
  }

  public searchUsers(searchRequest: string) {
    return this.http.get<{ users: UserModel[] }>('user/search', {
      params: new HttpParams().set('q', searchRequest),
    }).pipe(
      map(response => response.users)
    );
  }

  selectConversation(id: string): Observable<SelectedConversationModel> {
    return this.http.get<SelectedConversationModel | null>(`conversation/with/${id}`).pipe(
      withLatestFrom(this.userService.getCurrentUser() as Observable<UserModel>),
      map(([response, currentUser]) => {
        const selectedUserEntry = localStorage.getItem('selectedUser');
        let selectedUser;

        if (selectedUserEntry) {
          selectedUser = JSON.parse(selectedUserEntry);
        }

        return response !== null ? {
          ...response,
          participants: response.participants.sort((a, b) => a.id !== currentUser.id ? -1 : 1)
        } : {
          participants: [...(selectedUser && [selectedUser])],
          messages: []
        }
      })
    );
  }

  sendMessage(message: MessageSendRequestModel): Observable<any> {
    return this.http.post('message/send', message);
  }
}
