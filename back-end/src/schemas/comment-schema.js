import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string().min(3).max(300),
  userName: z.string().min(3),
  userEmail: z.string().email(),
});

export const updateCommentSchema = z.object({
  comment: z.string().min(3).max(300),
});
