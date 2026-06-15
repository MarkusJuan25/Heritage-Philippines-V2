import { sendQuoteNotifications } from "./quotes.email.js";
import { validateQuoteRequest } from "./quotes.validation.js";

const quoteRequests = [];

export async function createQuoteRequest(payload) {
  const validatedQuote = validateQuoteRequest(payload);

  const quote = {
    id: `quote_${Date.now()}`,
    status: "received",
    ...validatedQuote,
    createdAt: new Date().toISOString(),
  };

  quoteRequests.push(quote);

  await sendQuoteNotifications(quote);

  return quote;
}
