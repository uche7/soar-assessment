import * as Yup from "yup";

/** Validation Schema */
export const validationSchema = Yup.object({
  yourName: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(/^[^\s].*$/, "Name cannot start with a space"),
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[^\s].*$/, "Username cannot start with a space"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dateOfBirth: Yup.string()
    .trim()
    .required("Date of birth is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format"
    ),
  presentAddress: Yup.string()
    .trim()
    .required("Present address is required")
    .min(5, "Address must be at least 5 characters"),
  permanentAddress: Yup.string()
    .trim()
    .required("Permanent address is required")
    .min(5, "Address must be at least 5 characters"),
  city: Yup.string()
    .trim()
    .required("City is required")
    .min(3, "City must be at least 3 characters"),
  postalCode: Yup.string()
    .trim()
    .required("Postal code is required")
    .min(4, "Postal code must be at least 4 characters"),
  country: Yup.string()
    .trim()
    .required("Country is required")
    .min(3, "Country must be at least 3 characters"),
});

/** Yup Security Section validation schema */
export const validationSchemaSecurity = Yup.object({
  newPassword: Yup.string()
    .trim()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
