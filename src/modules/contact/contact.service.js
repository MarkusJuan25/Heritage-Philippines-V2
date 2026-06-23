import { randomUUID } from "crypto";
import { sendContactNotifications } from "./contact.email.js";
import { validateContactInquiry } from "./contact.validation.js";
import { createContactRecord, updateContactNotificationStatus } from "./contact.repository.js";

export async function createContactInquiry(payload) {
  const validated = validateContactInquiry(payload);

  const inquiry = {
    id: `contact_${randomUUID()}`,
    status: "received",
    notificationStatus: "pending",
    ...validated,
    createdAt: new Date().toISOString(),
  };

  const saved = await createContactRecord(inquiry);

  let notificationStatus = "pending";

  try {
    const result = await sendContactNotifications(saved);

    if (result.status === "sent") {
      notificationStatus = "sent";
    } else if (result.status === "partial_failed") {
      notificationStatus = "partial_failed";
    } else if (result.status === "skipped") {
      notificationStatus =
        result.reason === "disabled" ? "disabled" : "missing_configuration";
    }
  } catch (err) {
    console.error(
      `[contact] Email notification error for ${saved.id}:`,
      err?.message || err,
    );
    notificationStatus = "failed";
  }

  try {
    await updateContactNotificationStatus(saved.id, notificationStatus);
  } catch (err) {
    console.error(
      `[contact] Failed to update notificationStatus for ${saved.id}:`,
      err?.message || err,
    );
  }

  return { ...saved, notificationStatus };
}
