import { Iuser } from 'app/shared/models/user.model';
import { AppState } from '../core.module';
export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: Iuser;
}

export interface Auth extends AppState {
  auth: AuthState;
}
