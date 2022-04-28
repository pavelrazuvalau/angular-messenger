import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as fromUser from '../store/reducers/user.reducer';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store) { }

  fetchUser() {
    return this.http.get<UserModel>('/user/me');
  }

  getCurrentUser() {
    return this.store.select(fromUser.getUserStore).pipe(
      filter(({ isFetched }) => isFetched),
      map(({user}) => user),
    )
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
