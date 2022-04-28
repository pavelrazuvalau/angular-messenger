import { UserModel } from './user.model';

export interface BaseMessageModel {
  message: string;
  timestamp: string;
  id?: string;
}

export interface ConversationMessageModel extends BaseMessageModel {
  recipient: string;
  sender?: string;
}

export interface IncomingMessage extends BaseMessageModel {
  recipient: UserModel;
  sender: UserModel;
}

export interface MessageSendRequestModel {
  recipient: string;
  message: string;
}
