import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

const actionSource = '[User]';

export const FetchUser = createAction(
  `${actionSource} Fetch User`
)

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: UserModel }>()
)

export const FetchUserFailed = createAction(
  `${actionSource} Fetch User Failed`
)

export const ClearData = createAction(
  `${actionSource} Clear Data`
)
