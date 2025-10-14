import z from "zod";

export const signinSchema = z.object({
  username: z.email(),
  password: z.string({ error: "Password Should be min 8 letters" }).min(8),
});

export const signUpSchema = signinSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
});

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z
    .string({ error: "Password Should be min 8 letters" })
    .min(8)
    .optional(),
});

export const sendTransactionSchema = z.object({
  to: z.string(),
  amount: z.float64().refine((n) => n >= 1),
});
