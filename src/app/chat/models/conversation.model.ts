import { UserModel } from '../../core/models/user.model';
import { ConversationMessageModel } from '../../core/models/message.model';

export interface BaseConversationModel {
  participants: UserModel[];
  last_message?: ConversationMessageModel;
  id?: string;
}

export interface SelectedConversationModel extends BaseConversationModel {
  messages: ConversationMessageModel[],
}

export interface ConversationListResponseModel {
  conversations: BaseConversationModel[];
}
