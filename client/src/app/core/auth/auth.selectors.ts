import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
export const selectIsNotAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !state.isAuthenticated
);

export const selectUser = createSelector(selectAuth, auth => auth.user);

export const selectAuthorization = createSelector(
  selectAuth,
  auth => auth.token
);
