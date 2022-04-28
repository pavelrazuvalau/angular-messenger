import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders, HttpErrorResponse, HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';

import * as UserAction from '../store/actions/user.actions';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({
      url: environment.apiUrl + request.url,
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      }),
    })).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.store.dispatch(UserAction.ClearData());
        }

        return throwError(error);
      })
    );
  }
}
