import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: UserModel | null,
  isFetched: boolean,
  isLoading: boolean,
}

export const initialState: UserState = {
  user: null,
  isFetched: false,
  isLoading: false,
}

export const reducer = createReducer(
  initialState,
  on(UserActions.FetchUser, state => ({
    ...state,
    isLoading: true
  })),
  on(UserActions.FetchUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isFetched: true,
    isLoading: false,
  })),
  on(UserActions.FetchUserFailed, state => ({
    ...state,
    isFetched: true,
    isLoading: false,
  })),
  on(UserActions.ClearData, state => ({
    ...state,
    user: null
  })),
)

export const getUserStore = createFeatureSelector<UserState>('user');
export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => state.user
);
export const getIsFetched = createSelector(
  getUserStore,
  (state: UserState) => state.isFetched
);
