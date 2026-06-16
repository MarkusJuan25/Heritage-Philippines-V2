// In-memory quote store.
// Replace the body of each function here when switching to Prisma — callers stay the same.

const records = [];

export function createQuoteRecord(quote) {
  const stored = { ...quote };
  records.push(stored);
  return { ...stored };
}

export function listQuoteRecords() {
  return records.map((r) => ({ ...r }));
}

export function getQuoteRecordById(id) {
  const record = records.find((r) => r.id === id);
  return record ? { ...record } : undefined;
}
