import { FetchUser, FetchUserSuccess } from '../actions/user.actions';
import { initialState, reducer } from './user.reducer';

describe('User reducer', () => {
  it('should indicate loading,', () => {
    const action = FetchUser();
    const second = FetchUserSuccess({ user: {} as any });

    let result = reducer(initialState, action);
    result = reducer(result, second);

    expect(result.isLoading).toEqual(false);
  });
});
