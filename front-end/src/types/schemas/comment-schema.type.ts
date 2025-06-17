import { commentSchema } from "@/schemas";
import { z } from "zod";

export type CommentSchemaType = z.infer<typeof commentSchema>;
