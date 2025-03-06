import {
  SET_LANGUAGE,
  SET_THEME,
  TOGGLE_NOTIFICATIONS,
} from "../../redux/setting/preferences-actions";

/** Preferences State */
export interface PreferencesState {
  language: string;
  theme: string;
  notifications: boolean;
}

// Define action interfaces
export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: string;
}

export interface ToggleNotificationsAction {
  type: typeof TOGGLE_NOTIFICATIONS;
}

// Union type for all possible actions
export type PreferencesActionTypes =
  | SetLanguageAction
  | SetThemeAction
  | ToggleNotificationsAction;
