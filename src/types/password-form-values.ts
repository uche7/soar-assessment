/** Define form values interface */
export interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export interface SecurityState {
  isUpdating: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  password?: string;
}
