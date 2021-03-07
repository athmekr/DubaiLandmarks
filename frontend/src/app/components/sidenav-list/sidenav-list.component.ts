import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  userIsLogged: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsLogged = this.authService.userLogged;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.sidenavClose.emit();
  }

}
