import {
  SetLanguageAction,
  SetThemeAction,
  ToggleNotificationsAction,
} from "@/types/preferences";

export const SET_LANGUAGE = "SET_LANGUAGE" as const;
export const SET_THEME = "SET_THEME" as const;
export const TOGGLE_NOTIFICATIONS = "TOGGLE_NOTIFICATIONS" as const;

export const setLanguage = (language: string): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setTheme = (theme: string): SetThemeAction => ({
  type: SET_THEME,
  payload: theme,
});

export const toggleNotifications = (): ToggleNotificationsAction => ({
  type: TOGGLE_NOTIFICATIONS,
});
