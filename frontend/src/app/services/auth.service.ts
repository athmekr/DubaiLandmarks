import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { BehaviorSubject, Subject } from 'rxjs';
import Parse from 'parse';

// Using parse SDK
Parse.initialize(environment.PARSE_SERVER.APP_ID);
Parse.serverURL = environment.PARSE_SERVER.SERVER_URL;

@Injectable({providedIn: 'root'})

export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private authStatusListener = new Subject<boolean>();
  private currentUser = Parse.User.current();

  constructor(private http: HttpClient, private router: Router) {}

  // getToken method
  getToken(){
    if (this.currentUser) {
      return this.currentUser.getSessionToken();
    }
    else {
      return;
    }
  }

  getStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // getIsAuth method
  getIsAuth() {
    if (this.currentUser){
      return true;
    }
    else {
      return false;
    }
  }

  // login method
  login(username: string, password: string){
    Parse.User.logIn(username, password)
    .then(() => {
      this.isAuthenticated.next(true);
      this.router.navigate(['/']);
    },
    error => {
      this.authStatusListener.next(false);
    // maybe catch err for fail
    });
  }

  // logout method
  logout(){
    this.isAuthenticated.next(false);
    Parse.User.logOut().then((res) => {
      this.router.navigate(['/']);
    });
  }

}
