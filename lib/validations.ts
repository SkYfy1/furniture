import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1),
  password: z.string().min(6, "Password is too weak!"),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password is too weak!"),
});

export const orderSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  country: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().regex(/^\d{5}$/, {
    message: "Zip code must contain 5 digits",
  }),
  address: z.string().min(2),
  shippingService: z.enum(["MEEST", "NOVAPOST", "UKRPOSTA"], {
    message: "Please choose either MEEST, NOVAPOST or URKPOSTA",
  }),
  paymentMethod: z.enum(["CASH", "CARD", "CRYPTO"], {
    message: "Please choose either CARD, CASH or CRYPTO",
  }),
});

export type orderType = z.infer<typeof orderSchema>;
export type signInType = z.infer<typeof signInSchema>;
export type signUpType = z.infer<typeof signUpSchema>;
