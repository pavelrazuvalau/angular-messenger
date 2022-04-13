import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.userService.getUserObservable().pipe(
    map(user => !!user)
  );

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.clearData();
    this.router.navigateByUrl('/auth/sign-in');
  }

}
