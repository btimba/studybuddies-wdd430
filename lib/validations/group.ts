
import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Group name is required.")
    .max(100, "Group name cannot exceed 100 characters."),

  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(100, "Subject cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(500, "Description cannot exceed 500 characters."),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
