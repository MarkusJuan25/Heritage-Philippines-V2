// In-memory quote store.
// To switch to Prisma: replace each function body with the equivalent
// prisma.quote.create / findMany / findUnique call. Callers stay the same.

const records = [];

// Maps an assembled quote object to the stored record shape.
// When Prisma is introduced, this becomes the `data` argument to prisma.quote.create().
// Passthrough fields (e.g. selectedPrograms from the frontend) are preserved via spread
// so the API response shape stays complete; explicit core fields document the future schema.
function normalizeQuoteRecord(input) {
  return {
    ...input,
    id: input.id,
    status: input.status ?? "received",
    createdAt: input.createdAt,
    name: input.name ?? "",
    email: input.email ?? "",
    phone: input.phone ?? "",
    destination: input.destination ?? "",
    province: input.province ?? "",
    packageStyle: input.packageStyle ?? "",
    groupSize: input.groupSize ?? null,
    startDate: input.startDate ?? "",
    endDate: input.endDate ?? "",
    message: input.message ?? "",
  };
}

export function createQuoteRecord(quote) {
  const stored = normalizeQuoteRecord(quote);
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
