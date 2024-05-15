import { z } from "zod";

export const newStudentSchema = z.object({
  first_name: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(1, { message: "Required" }),
  last_name: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .min(1, { message: "Required" }),
  phone_number: z
    .string()
    .refine((value) => /^\d{10}$/.test(value), "Must be exactly 10 digits"),
  email: z.string().email().optional().or(z.literal("")),
  driving_class: z.string({
    required_error: "Driving Class is required",
    invalid_type_error: "Driving Class must be a string",
  }),
  bde: z.string({
    required_error: "BDE is required",
    invalid_type_error: "BDE must be a string",
  }),
  street_address: z
    .string({
      required_error: "Street Address is required",
      invalid_type_error: "Street Address must be a string",
    })
    .min(1, { message: "Required" }),
  postal_code: z
    .string({
      required_error: "Postal Code is required",
      invalid_type_error: "Postal Code must be a string",
    })
    .min(1, { message: "Required" }),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .min(1, { message: "Required" }),
  province: z
    .string({
      required_error: "Province is required",
      invalid_type_error: "Province must be a string",
    })
    .min(1, { message: "Required" }),
  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .min(1, { message: "Required" }),
  remarks: z.string().optional(),
});
