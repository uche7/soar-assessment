import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PreferencesState } from "@/types/preferences";

const initialState: PreferencesState = {
  language: "English",
  theme: "Light",
  notifications: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
  },
});

// Export actions
export const { setLanguage, setTheme, toggleNotifications } =
  preferencesSlice.actions;

// Export reducer
export default preferencesSlice.reducer;
