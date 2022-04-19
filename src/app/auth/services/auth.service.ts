import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel, LoginRequestModel, RegisterRequestModel } from '../models/auth.model';
import { tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  register(payload: RegisterRequestModel) {
    return this.http.post<AuthResponseModel>('/auth/register', payload).pipe(
      tap(response => this.handleResponse(response))
    );
  }

  login(payload: LoginRequestModel) {
    return this.http.post<AuthResponseModel>('/auth/login', payload).pipe(
      tap(response => this.handleResponse(response))
    );
  }

  private handleResponse(response: AuthResponseModel) {
    localStorage.setItem('token', response.token);
    this.userService.setCurrentUser(response.user);
  }
}
