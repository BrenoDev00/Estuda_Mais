import { commentSchema } from "@/schemas";
import { z } from "zod";

export type NewCommentType = z.infer<typeof commentSchema>;
