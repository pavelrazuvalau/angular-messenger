import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'chat', // http://localhost:4200/chat
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canLoad: [AuthGuard],
    data: {
      applicableUserRoles: ['MODERATOR', 'ADMIN']
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
