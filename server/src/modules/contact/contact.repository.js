import { prisma } from "../../lib/prisma.js";

function mapRecord(record) {
  return {
    ...record,
    createdAt:
      record.createdAt instanceof Date ? record.createdAt.toISOString() : record.createdAt,
    updatedAt:
      record.updatedAt instanceof Date ? record.updatedAt.toISOString() : record.updatedAt,
  };
}

export async function createContactRecord(input) {
  const record = await prisma.contactInquiry.create({
    data: {
      id: input.id,
      status: input.status ?? "received",
      name: input.name ?? "",
      email: input.email ?? "",
      phone: input.phone ?? "",
      countryCode: input.countryCode ?? "",
      inquiryType: input.inquiryType ?? "",
      destination: input.destination ?? "",
      startDate: input.startDate ?? "",
      endDate: input.endDate ?? "",
      message: input.message ?? "",
      consent: input.consent ?? true,
      source: input.source ?? "contact-page",
      notificationStatus: input.notificationStatus ?? "pending",
      createdAt: input.createdAt ? new Date(input.createdAt) : new Date(),
    },
  });
  return mapRecord(record);
}

export async function updateContactNotificationStatus(id, notificationStatus) {
  const record = await prisma.contactInquiry.update({
    where: { id },
    data: { notificationStatus },
  });
  return mapRecord(record);
}
