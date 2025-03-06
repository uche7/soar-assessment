import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '@/types/form-values';

interface ProfileState extends FormValues {
  profileImage: string | null;
  isSaving: boolean;
  showPassword: boolean;
}

const initialState: ProfileState = {
  yourName: "Charlene Reed",
  username: "Charlene Reed",
  email: "charlenereed@gmail.com",
  password: "********",
  dateOfBirth: "1990-01-25",
  presentAddress: "San Jose, California, USA",
  permanentAddress: "San Jose, California, USA",
  city: "San Jose",
  postalCode: "45962",
  country: "USA",
  profileImage: null, // Will be set to default image or loaded value
  isSaving: false,
  showPassword: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    resetProfile: (state) => {
      return { ...initialState, profileImage: state.profileImage }; // Preserve image if needed
    },
  },
});

export const { setProfileImage, setIsSaving, toggleShowPassword, updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;