import z from "zod";

export const signinSchema = z.object({
  username: z.email(),
  password: z.string({ error: "Password Should be min 8 letters" }).min(8),
});

export const signUpSchema = signinSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
});
