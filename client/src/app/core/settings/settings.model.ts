import { AppState } from '../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface SettingsState {
  theme: string;
  autoNightMode: boolean;
  nightTheme: string;
  hour: number;
}

export interface State extends AppState {
  settings: SettingsState;
}
