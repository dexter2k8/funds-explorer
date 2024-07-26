import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default schema;
