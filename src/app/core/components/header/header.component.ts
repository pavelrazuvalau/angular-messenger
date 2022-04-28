import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as UserAction from '../../store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.userService.getCurrentUser().pipe(
    map(user => !!user)
  );

  constructor(private userService: UserService, private router: Router, private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(UserAction.ClearData());
    this.router.navigateByUrl('/auth/sign-in');
  }

}
