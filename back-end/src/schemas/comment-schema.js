import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string().min(3).max(300),
  userName: z.string().min(3),
});
