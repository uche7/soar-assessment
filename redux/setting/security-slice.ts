import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecurityState } from "@/types/password-form-values";

const initialState: SecurityState = {
  isUpdating: false,
  showNewPassword: false,
  showConfirmPassword: false,
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    toggleShowNewPassword: (state) => {
      state.showNewPassword = !state.showNewPassword;
    },
    toggleShowConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetSecurity: () => {
      return initialState;
    },
  },
});

export const {
  setIsUpdating,
  toggleShowNewPassword,
  toggleShowConfirmPassword,
  updatePassword,
  resetSecurity,
} = securitySlice.actions;
export default securitySlice.reducer;
