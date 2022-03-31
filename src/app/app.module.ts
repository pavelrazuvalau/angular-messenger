import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { StatusDirective } from './directives/status.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConversationListComponent,
    ChatComponent,
    ChatMessageComponent,
    StatusDirective,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
