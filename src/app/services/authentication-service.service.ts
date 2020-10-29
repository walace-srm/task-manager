import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<UserModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;

  constructor(private httClient: HttpClient) { }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

    login(username, password) {
    return this.httClient.post<any>(`https://api-manager-task.herokuapp.com/users/auth`, { username, password })
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return user;
        }));
  }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        // this.currentUserSubject.next(null);
    }

    create(username, password) {
      return this.httClient.post(`https://api-manager-task.herokuapp.com/users/create`, {username, password});
    }
}
