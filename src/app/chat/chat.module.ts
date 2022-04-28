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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    StoreModule.forFeature('chat', (state = {}) => ({ lalala: 1 })),
    EffectsModule.forFeature([]),
  ],
  providers: [ChatService],
})
export class ChatModule { }
