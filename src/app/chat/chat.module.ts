import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    ConversationListComponent,
    ChatComponent,
    ChatMessageComponent,
    ChatPageComponent,
  ],
  exports: [
    ConversationListComponent,
    ChatComponent,
    ChatMessageComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [ChatService],
})
export class ChatModule { }
