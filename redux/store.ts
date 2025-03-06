import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./setting/profile-slice";
import securityReducer from "./setting/security-slice";
import dashboardReducer from "./dashboard/dashboard-slice";
import preferencesReducer from "./setting/preferences-slice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    profile: profileReducer,
    security: securityReducer,
    dashboard: dashboardReducer,
  },
});

// Define RootState and AppDispatch for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
