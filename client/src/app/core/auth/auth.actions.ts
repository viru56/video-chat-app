import { createAction, props } from '@ngrx/store';
import { Iuser } from 'app/shared/models/user.model';

export const authLogin = createAction(
  '[Auth] Login',
  props<{ isAuthenticated: boolean; token: string; user: Iuser }>()
);
export const authLogout = createAction('[Auth] Logout');

export const authUser = createAction('[Auth] User', props<{ user: Iuser }>());
