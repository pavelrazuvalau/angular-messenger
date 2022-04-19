import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { BaseConversationModel, SelectedConversationModel } from '../models/conversation.model';

@Injectable()
export class ChatService implements OnDestroy {
  private selectedConversationsMock: SelectedConversationModel[] = [
    {
      last_message: {
        recipient: '62154955353e6c41ea0348ee',
        sender: '62154d88353e6c41ea0348ef',
        timestamp: '2022-02-22T21:47:44.699Z',
        message: 'Message 11',
        id: '115',
      },
      messages: [
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348ef',
          timestamp: '2022-02-22T21:30:44.699Z',
          message: 'Message 15',
          id: '111',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348ef',
          timestamp: '2022-02-22T21:35:44.699Z',
          message: 'Message 14',
          id: '112',
        },
        {
          recipient: '62154d88353e6c41ea0348ef',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T21:37:44.699Z',
          message: 'Message 13',
          id: '113',
        },
        {
          recipient: '62154d88353e6c41ea0348ef',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T21:40:44.699Z',
          message: 'Message 12',
          id: '114',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348ef',
          timestamp: '2022-02-22T21:47:44.699Z',
          message: 'Message 11',
          id: '115',
        },
      ],
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Peter Gregor',
          last_seen: '2022-02-22T21:44:48.002Z',
          id: '62154d88353e6c41ea0348ef',
        },
      ],
      id: '62154e39353e6c41ea0348f1',
    },
    {
      last_message: {
        recipient: '62154955353e6c41ea0348ee',
        sender: '62154d88353e6c41ea0348eh',
        timestamp: '2022-02-22T18:47:44.699Z',
        message: 'Message 21',
        id: '125',
      },
      messages: [
        {
          recipient: '62154d88353e6c41ea0348eh',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T18:30:44.699Z',
          message: 'Message 25',
          id: '121',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348eh',
          timestamp: '2022-02-22T18:35:44.699Z',
          message: 'Message 24',
          id: '122',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348eh',
          timestamp: '2022-02-22T18:37:44.699Z',
          message: 'Message 23',
          id: '123',
        },
        {
          recipient: '62154d88353e6c41ea0348eh',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T18:40:44.699Z',
          message: 'Message 22',
          id: '124',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0348eh',
          timestamp: '2022-02-22T19:47:44.699Z',
          message: 'Message 21',
          id: '125',
        },
      ],
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Jessica Larson',
          last_seen: 'online',
          id: '62154d88353e6c41ea0348eh',
        },
      ],
      id: '62154e39353e6c41ea0348f2',
    },
    {
      last_message: {
        recipient: '62154d88353e6c41ea0344322',
        sender: '62154955353e6c41ea0348ee',
        timestamp: '2022-02-22T17:15:44.699Z',
        message: 'Message 31',
        id: '135',
      },
      messages: [
        {
          recipient: '62154d88353e6c41ea0344322',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T17:30:44.699Z',
          message: 'Message 35',
          id: '131',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0344322',
          timestamp: '2022-02-22T17:35:44.699Z',
          message: 'Message 34',
          id: '132',
        },
        {
          recipient: '62154955353e6c41ea0348ee',
          sender: '62154d88353e6c41ea0344322',
          timestamp: '2022-02-22T17:37:44.699Z',
          message: 'Message 33',
          id: '133',
        },
        {
          recipient: '62154d88353e6c41ea0344322',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T17:40:44.699Z',
          message: 'Message 32',
          id: '134',
        },
        {
          recipient: '62154d88353e6c41ea0344322',
          sender: '62154955353e6c41ea0348ee',
          timestamp: '2022-02-22T17:15:44.699Z',
          message: 'Message 31',
          id: '135',
        },
      ],
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Lisa Guerrero',
          last_seen: '2022-02-22T21:44:48.002Z',
          id: '62154d88353e6c41ea0344322',
        },
      ],
      id: '62154e39353e6c41ea0348f3',
    },
  ];

  private conversationListMock: BaseConversationModel[] = [
    {
      last_message: {
        recipient: '62154955353e6c41ea0348ee',
        sender: '62154d88353e6c41ea0348ef',
        timestamp: '2022-02-22T21:47:44.699Z',
        message: 'Message 11',
        id: '115',
      },
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Peter Gregor',
          last_seen: '2022-02-22T21:44:48.002Z',
          id: '62154d88353e6c41ea0348ef',
        },
      ],
      id: '62154e39353e6c41ea0348f1',
    },
    {
      last_message: {
        recipient: '62154955353e6c41ea0348ee',
        sender: '62154d88353e6c41ea0348eh',
        timestamp: '2022-02-22T18:47:44.699Z',
        message: 'Message 21',
        id: '125',
      },
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Jessica Larson',
          last_seen: 'online',
          id: '62154d88353e6c41ea0348eh',
        },
      ],
      id: '62154e39353e6c41ea0348f2',
    },
    {
      last_message: {
        recipient: '62154d88353e6c41ea0344322',
        sender: '62154955353e6c41ea0348ee',
        timestamp: '2022-02-22T17:15:44.699Z',
        message: 'Message 31',
        id: '135',
      },
      participants: [
        {
          username: 'Steve Bangalter',
          last_seen: 'online',
          id: '62154955353e6c41ea0348ee',
        },
        {
          username: 'Lisa Guerrero',
          last_seen: '2022-02-22T21:44:48.002Z',
          id: '62154d88353e6c41ea0344322',
        },
      ],
      id: '62154e39353e6c41ea0348f3',
    },
  ];

  public usersSubject = new ReplaySubject<UserModel[]>();

  constructor(private http: HttpClient) { }

  getConversationList() {
    return this.conversationListMock;
  }

  public searchUsers(searchRequest: string): void {
    if (!searchRequest) {
      this.usersSubject.next([])
    } else {
      this.http.get<{ users: UserModel[] }>('user/search', {
        params: new HttpParams().set('q', searchRequest),
      }).pipe(
        take(1),
        map(resp => this.usersSubject.next(resp.users)),
      ).subscribe();
    }
  }

  selectConversation(id: string) {
    return this.selectedConversationsMock.find(item => item.id === id);
  }

  sendMessage(recipient: string, message: string): Observable<any> {
    return this.http.post('message/send', {
      recipient: recipient,
      message: message,
    }).pipe(
      take(1)
    );
  }

  ngOnDestroy(): void {
    this.usersSubject.complete();
  }
}
