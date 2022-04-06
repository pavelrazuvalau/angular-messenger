import { UserModel } from '../../core/models/user.model';

export interface LoginRequestModel {
  username: string;
  password: string;
}

export interface RegisterRequestModel extends LoginRequestModel {
  mail: string;
}

export interface AuthResponseModel {
  token: string;
  user: UserModel;
}
