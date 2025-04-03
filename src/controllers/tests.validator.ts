import { z } from "zod";

const testSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  description: z.string().trim().min(1, "Description is required"),

  center: z.number().int("Object ID must be an integer"),
});

const testUpdateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  description: z.string().trim().min(1, "Description is required"),
});
export { testSchema, testUpdateSchema };
