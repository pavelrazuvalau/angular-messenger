import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return timer(5000).pipe(map(() => 'Hi!'));
  }
}
