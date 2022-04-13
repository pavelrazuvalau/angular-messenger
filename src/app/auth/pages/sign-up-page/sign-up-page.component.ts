import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequestModel } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  user:  RegisterRequestModel = {
    username: '',
    mail: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) { }

  register(){
    if (this.user && this.user.username && this.user.mail && this.user.password) {
      this.auth.register(this.user).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }

}
