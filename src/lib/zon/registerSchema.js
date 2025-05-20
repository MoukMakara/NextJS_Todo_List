import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username cannot be empty!" })
    .max(50, { message: "Username should'nt exceed 50 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email format!" })
    .min(1, { message: "Email cannot be empty!" }),
  password: z.string().min(1, { message: "Password cannot be empty!" }),
});
