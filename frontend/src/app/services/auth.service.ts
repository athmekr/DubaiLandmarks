import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Parse from 'parse';


import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
//import { User } from '../models/user.model';

// Using parse SDK
Parse.initialize(environment.PARSE_SERVER.APP_ID);
Parse.serverURL = environment.PARSE_SERVER.SERVER_URL;

@Injectable({providedIn: 'root'})

export class AuthService {
  //private isAuthenticated = new BehaviorSubject<boolean>(false);
  private isLogged: BehaviorSubject<boolean>;
  //private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.isLogged = new BehaviorSubject<boolean>(false);
  }

/*   getStatusListener() {
    return this.authStatusListener.asObservable();
  } */

  // getIsAuth method
  getIsAuth() {
    if (Parse.User.current()){
      console.log("aaaa5");
      return true;
    }
    else {
      console.log("aaaa6");
      return false;
    }
  }

  // getToken method
  get getToken(){
    let user = Parse.User.current();
    if (user) {
      console.log("aaaa7");
      return user.getSessionToken();
    }
    else {
      console.log("aaaa8");
      return;
    }
  }

  get userLogged() : Observable<boolean> {
    this.isLogged.next(this.getIsAuth());
    return this.isLogged;
  }



  // Login the user using credentials
  login(username, password) {
    return new Promise<void>(async (resolve, reject) => {
      Parse.User.logIn(username, password).then(async (success) => {
        console.log("aaaa9");
        this.isLogged.next(true);
        this.router.navigate(['/']);
        resolve();
      }, (err) => {
          console.log('Login failed!');
          reject(err);
      });
    });
  }
/*   // login method
   login(username: string, password: string){
    //let user = Parse.User.current();
    //return new Promise<void>(async (resolve, reject) => {
    Parse.User.logIn(username, password).then((success) => {
      this.isLogged.next(true);
      this.router.navigateByUrl('/');
        //resolve();
    },(err) => {
      console.log('Login failed!');
      //reject(err);
      //error => {
        //this.authStatusListener.next(false);
      // maybe catch err for fail
    });
  } */
  //}

  // logout method
  logout(){
    this.isLogged.next(false);
    Parse.User.logOut().then((res) => {
      this.router.navigate(['/']);
    });
  }

}
