import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMapTo, tap } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  fetchUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.FetchUser),
      switchMapTo(
        this.userService.fetchUser().pipe(
          map(user => UserActions.FetchUserSuccess({ user })),
          catchError(() => of(UserActions.FetchUserFailed()))
        )
      ),
    )
  )

  clearData$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.ClearData),
      tap(() => {
        this.userService.clearToken();
      })
    ), { dispatch: false }
  )
}
