import { z } from "zod";

const questionsSchema = z.object({
  text: z.string().trim().min(1, "Text is required"),

  options: z.string().array().min(1, "Option is required"),

  test: z.number().int("Object ID must be an integer"),
});

const questionsUpdateSchema = z.object({
  text: z.string().trim().min(1, "Text is required"),

  options: z.string().array().min(1, "Option is required"),
});
export { questionsSchema, questionsUpdateSchema };
