import { z } from "zod";

export const taskSchema = z.object({
  task: z.string().min(3).max(300),
  isPublic: z.boolean(),
  userEmail: z.string().email(),
});

export const updateTaskSchema = z.object({
  task: z.string().min(3).max(300),
  isPublic: z.boolean(),
});
