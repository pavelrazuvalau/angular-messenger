import { UserModel } from '../../core/models/user.model';

export interface BaseMessageModel {
  id: string;
  message: string;
  timestamp: string;
}

export interface ConversationMessageModel extends BaseMessageModel{
  recipient: string;
  sender: string;
}

export interface IncomingMessage extends BaseMessageModel {
  recipient: UserModel;
  sender: UserModel;
}

export interface MessageSendRequestModel {
  recipient: string;
  message: string;
}
