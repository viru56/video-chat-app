import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { authLogin, authLogout } from './auth.actions';
import { selectAuthState } from '../core.state';
import { Auth } from './auth.models';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<Auth>,
    private cookieService: CookieService
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        withLatestFrom(this.store.pipe(select(selectAuthState))),
        tap(([action, auth]) => {
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: true,
            token: auth.token
          });
          this.cookieService.set('token',auth.token);
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['/']);
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
          this.cookieService.delete('token');
        })
      ),
    { dispatch: false }
  );
}
