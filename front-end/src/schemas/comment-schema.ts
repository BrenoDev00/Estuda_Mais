import { z } from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .min(3, "Informe pelo menos 3 caracteres")
    .max(300, "Máximo de 300 caracteres permitido"),
});
