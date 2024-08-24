import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Must be a valid email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(\d)/, "Password must contain a number"),
  admin: yup.boolean().default(false),
  avatar: yup.string().optional(),
});

export default schema;
