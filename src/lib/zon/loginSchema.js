import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty!" })
    .email({ message: "Invalid email format!" }),
  password: z.string().min(1, { message: "Password cannot be empty!" }),
});
