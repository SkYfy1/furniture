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

export type signInType = z.infer<typeof signInSchema>;
export type signUpType = z.infer<typeof signUpSchema>;
