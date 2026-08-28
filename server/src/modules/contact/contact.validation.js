import { z } from "zod";

const VALID_INQUIRY_TYPES = [
  "Tour Inquiry",
  "Package Quote",
  "Hotel & Transfers",
  "Visa and Insurance Assistance",
  "Custom Family Route",
  "Regional Tour Planning",
  "General Inquiry",
];

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const contactInquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name is too long."),
    email: z.string().trim().email("A valid email address is required."),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required.")
      .max(40, "Phone number is too long."),
    countryCode: z.string().trim().max(20, "Country code is too long.").default("PH"),
    inquiryType: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((val) => !val || VALID_INQUIRY_TYPES.includes(val), {
        message: "Invalid inquiry type.",
      }),
    destination: z.string().trim().max(150, "Destination is too long.").optional().default(""),
    startDate: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((val) => !val || ISO_DATE_RE.test(val), {
        message: "Start date must be in YYYY-MM-DD format.",
      }),
    endDate: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((val) => !val || ISO_DATE_RE.test(val), {
        message: "End date must be in YYYY-MM-DD format.",
      }),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters.")
      .max(2000, "Message is too long."),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Consent is required to submit this form." }),
    }),
    source: z.string().trim().optional().default("contact-page"),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return data.endDate >= data.startDate;
    },
    { message: "End date cannot be before start date.", path: ["endDate"] },
  );

export function validateContactInquiry(payload) {
  const parsed = contactInquirySchema.safeParse(payload);

  if (!parsed.success) {
    const error = new Error("Contact inquiry validation failed.");
    error.statusCode = 400;
    error.details = parsed.error.issues.map((issue) => ({
      field: issue.path.join(".") || "body",
      message: issue.message,
    }));
    throw error;
  }

  return parsed.data;
}
