import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isUserFetched = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userService.fetchUser().pipe(
        finalize(() => {
          this.isUserFetched = true;
        })
      ).subscribe();
  }
}
