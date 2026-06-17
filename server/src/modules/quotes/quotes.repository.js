// Prisma-backed quote store.
// Each function maps to prisma.quoteRequest.create / findMany / findUnique.

import { prisma } from "../../lib/prisma.js";

function mapRecord(record) {
  return {
    ...record,
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : record.createdAt,
    updatedAt:
      record.updatedAt instanceof Date
        ? record.updatedAt.toISOString()
        : record.updatedAt,
  };
}

export async function createQuoteRecord(input) {
  const record = await prisma.quoteRequest.create({
    data: {
      id: input.id,
      status: input.status ?? "received",
      name: input.name ?? "",
      email: input.email ?? "",
      phone: input.phone ?? "",
      destination: input.destination ?? "",
      province: input.province ?? "",
      packageStyle: input.packageStyle ?? "",
      source: input.source ?? "website",
      groupSize: input.groupSize ?? null,
      startDate: input.startDate ?? "",
      endDate: input.endDate ?? "",
      message: input.message ?? "",
      selectedPrograms: input.selectedPrograms ?? null,
      createdAt: input.createdAt ? new Date(input.createdAt) : new Date(),
    },
  });
  return mapRecord(record);
}

export async function listQuoteRecords() {
  const records = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapRecord);
}

export async function getQuoteRecordById(id) {
  const record = await prisma.quoteRequest.findUnique({
    where: { id },
  });
  return record ? mapRecord(record) : undefined;
}
