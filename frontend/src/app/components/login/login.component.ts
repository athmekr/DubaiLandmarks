import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.getIsAuth()) {
      this.router.navigateByUrl('/');
    }
   }

  onLogin (form: NgForm) {
    if (form.invalid) {
      console.log("aaaa1");
      return;
    } else {
      console.log(form.value.username);
      console.log(form.value.password);
      console.log("aaaa2");
      this.authService.login(form.value.username, form.value.password);
    }
  }

/*   ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  } */
}
