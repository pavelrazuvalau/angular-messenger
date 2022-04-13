export interface UserModel {
  username: string;
  last_seen: 'online' | string;
  id: string;
}

export interface UserSearchResponseModel {
  users: UserModel[];
}
