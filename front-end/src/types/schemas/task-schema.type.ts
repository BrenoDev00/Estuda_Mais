import { taskSchema } from "@/schemas";
import z from "zod";

export type TaskSchemaType = z.infer<typeof taskSchema>;
