import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  ReplaySubject,
  skipUntil,
  tap,
  BehaviorSubject,
  throwError,
} from 'rxjs';
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

  private currentUser$ = new BehaviorSubject<UserModel | null>(null);
  private isUserFetched$ = new ReplaySubject<void>();

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.currentUserMock;
  }

  fetchUser() {
    return this.http.get<UserModel>('/user/me').pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(error => {
        this.isUserFetched$.next();
        this.currentUser$.next(null);

        return throwError(error);
      }),
    );
  }

  getUserObservable() {
    return this.currentUser$.pipe(
      skipUntil(this.isUserFetched$)
    )
  }

  clearData() {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }

  setCurrentUser(user: UserModel) {
    console.log(user)
    this.isUserFetched$.next();
    this.currentUser$.next(user);
  }
}
