import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';

import { UserEffects } from './user.effects';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';

class MockUserService {
  fetchUser = jasmine.createSpy('fetchUser').and.returnValue(of({ a: 1 }));
}

describe('My Effects', () => {
  let effects: UserEffects;
  let actions: ReplaySubject<any>;
  let service: MockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        { provide: UserService, useClass: MockUserService }
        // other providers
      ],
    });

    effects = TestBed.inject(UserEffects);
    actions = new ReplaySubject(1);
    service = TestBed.inject(UserService) as any;
  });

  it('should fetch user successfully', (done) => {
    actions.next(UserActions.FetchUser());

    effects.fetchUser$.subscribe(result => {
      expect(result).toEqual(UserActions.FetchUserSuccess({ user: { a: 1 } as any }));
      done();
    });
  });

  it('should dispatch error', (done) => {
    service.fetchUser.and.returnValue(throwError({}));

    actions.next(UserActions.FetchUser());

    effects.fetchUser$.subscribe(result => {
      expect(result).toEqual(UserActions.FetchUserFailed());
      done();
    });
  });
});
