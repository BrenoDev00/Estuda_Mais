import z from "zod";

export const taskSchema = z.object({
  task: z
    .string()
    .min(3, "Informe pelo menos 3 caracteres")
    .max(300, "Máximo de 300 caracteres permitido"),
  isPublic: z.boolean(),
});
