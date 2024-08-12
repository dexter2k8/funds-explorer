import * as yup from "yup";

const schema = yup.object({
  bought_at: yup
    .string()
    .required("Date of purchase is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  quantity: yup.number().required("Quantity is required"),
  fund_alias: yup
    .string()
    .required("Fund alias is required")
    .max(7, "Fund alias must be at most 7 characters"),
});

export default schema;
