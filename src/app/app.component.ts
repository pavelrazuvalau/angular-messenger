import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UserService } from './core/services/user.service';
import { Store } from '@ngrx/store';

import * as UserAction from './core/store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserFetched = false;

  constructor(private userService: UserService, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserAction.FetchUser());

    this.userService.fetchUser().pipe(
      finalize(() => {
        this.isUserFetched = true;
      }),
    ).subscribe();
  }
}
