import { AuthState } from './auth.models';
import { authLogin, authLogout, authUser } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: ''
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state, action) => ({ ...state, ...action })),
  on(authLogout, state => ({ ...state, isAuthenticated: false })),
  on(authUser, (state, action) => ({ ...state, ...action }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
