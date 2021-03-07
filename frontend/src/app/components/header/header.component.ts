import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  userIsLogged: Observable<boolean>;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsLogged = this.authService.userLogged;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
