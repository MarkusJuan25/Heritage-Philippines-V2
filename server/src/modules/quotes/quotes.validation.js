import { z } from "zod";

export const quoteRequestSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("A valid email address is required."),
    phone: z.string().trim().optional().default(""),
    destination: z.string().trim().min(2, "Destination is required."),
    groupSize: z.coerce
      .number()
      .int("Group size must be a whole number.")
      .positive("Group size must be greater than zero.")
      .max(500, "Group size is too large.")
      .optional(),
    startDate: z.string().trim().optional().default(""),
    endDate: z.string().trim().optional().default(""),
    message: z.string().trim().max(2000, "Message is too long.").optional().default(""),
    packageStyle: z.string().trim().optional().default(""),
    province: z.string().trim().optional().default(""),
  })
  .passthrough();

export function validateQuoteRequest(payload) {
  const parsed = quoteRequestSchema.safeParse(payload);

  if (!parsed.success) {
    const error = new Error("Quote request validation failed.");

    error.statusCode = 400;
    error.details = parsed.error.issues.map((issue) => ({
      field: issue.path.join(".") || "body",
      message: issue.message,
    }));

    throw error;
  }

  return parsed.data;
}