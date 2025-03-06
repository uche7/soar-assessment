import * as Yup from "yup";

/** Validation Schema */
export const validationSchema = Yup.object({
  yourName: Yup.string().required("Your name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dateOfBirth: Yup.string()
    .required("Date of birth is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format"
    ),
  presentAddress: Yup.string().required("Present address is required"),
  permanentAddress: Yup.string().required("Permanent address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "Postal code must be 5 digits")
    .required("Postal code is required"),
  country: Yup.string().required("Country is required"),
});

/** Yup Security Section validation schema */
export const validationSchemaSecurity = Yup.object({
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
