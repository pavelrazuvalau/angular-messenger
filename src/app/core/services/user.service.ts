import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserMock: UserModel = {
    username: 'Steve Bangalter',
    last_seen: 'online',
    id: '62154955353e6c41ea0348ee',
  };

  constructor() { }

  getCurrentUser() {
    return this.currentUserMock;
  }
}
