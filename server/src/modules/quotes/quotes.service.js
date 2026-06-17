import { sendQuoteNotifications } from "./quotes.email.js";
import { validateQuoteRequest } from "./quotes.validation.js";
import { createQuoteRecord } from "./quotes.repository.js";

export async function createQuoteRequest(payload) {
  const validatedQuote = validateQuoteRequest(payload);

  const quote = {
    id: `quote_${Date.now()}`,
    status: "received",
    ...validatedQuote,
    createdAt: new Date().toISOString(),
  };

  const saved = await createQuoteRecord(quote);

  try {
    await sendQuoteNotifications(saved);
  } catch (err) {
    console.error(`[quotes] Email notification error for ${saved.id}:`, err?.message || err);
  }

  return saved;
}
