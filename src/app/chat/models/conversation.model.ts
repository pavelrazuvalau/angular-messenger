import { UserModel } from '../../core/models/user.model';
import { ConversationMessageModel } from './message.model';

export interface BaseConversationModel {
  id: string;
  participants: UserModel[];
  last_message: ConversationMessageModel;
}

export interface SelectedConversationModel extends BaseConversationModel {
  messages: ConversationMessageModel[],
}

export interface ConversationListResponseModel {
  conversations: BaseConversationModel[];
}
