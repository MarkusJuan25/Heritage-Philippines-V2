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

  await sendQuoteNotifications(saved);

  return saved;
}
