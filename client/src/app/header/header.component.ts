import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogout,
  selectIsAuthenticated,
  selectUser,
  LocalStorageService
} from '../core/core.module';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'app/shared';
import { Iuser } from 'app/shared/models/user.model';
@Component({
  selector: 'vca-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appName = env.appName;
  logo = '../../assets/logo.png';
  user: Iuser;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<Iuser>;
  isHome: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.isHome = false;
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.store.pipe(select(selectUser)).subscribe(async user => {
      try {
        this.user = user
          ? user
          : this.localStorage.checkAuth() && (await this.userService.getUser());
      } catch (error) {
        this.onLogoutClick();
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') this.isHome = true;
        else this.isHome = false;
      }
    });
  }
  onLogoutClick() {
    this.store.dispatch(authLogout());
    this.user = null;
  }
  onSettingsClick() {
    this.router.navigateByUrl('/settings');
  }
}
