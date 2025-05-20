import { z } from "zod";

export const taskSchema = z.object({
  taskTitle: z
    .string()
    .min(1, { message: "Title cannot be empty!" })
    .max(100, { message: "Title should'nt exceed 100 characters long!" }),
  taskDetails: z.string().min(1, { message: "Details cannot be empty!" }),
  tag: z.string({ required_error: "Tag cannot be empty!" }),
  endDate: z
    .date({ required_error: "End date cannot be empty!" }) // Custom required error
    .refine((date) => date >= new Date(), {
      message: "End date cannot be in the past",
    }),
});
