import { Resend } from "resend";

const BRAND_NAME = "Heritage Philippines";

// ─── Escaping / formatting ────────────────────────────────────────────────────

function escapeHtml(value = "") {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[ch];
  });
}

function formatValue(value, fallback = "Not provided") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function formatPhilippineDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const getPart = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${getPart("month")} ${getPart("day")}, ${getPart("year")} at ${getPart("hour")}:${getPart("minute")} ${getPart("dayPeriod")} PHT`;
}

function formatTravelDate(dateStr) {
  if (!dateStr || !String(dateStr).trim()) return null;
  const parts = String(dateStr).split("-");
  if (parts.length !== 3) return String(dateStr);
  const [y, m, d] = parts.map(Number);
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!MONTHS[m - 1] || d < 1 || d > 31 || y < 2000) return String(dateStr);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// ─── Config ───────────────────────────────────────────────────────────────────

function getEmailConfig() {
  return {
    enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.EMAIL_FROM || "",
    adminEmail:
      process.env.CONTACT_ADMIN_EMAIL ||
      process.env.QUOTE_ADMIN_EMAIL ||
      "",
  };
}

// ─── HTML building blocks ─────────────────────────────────────────────────────

function buildRow(label, value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  return `
  <tr>
    <td style="padding:10px 20px 10px 20px;border-bottom:1px solid #f0e8dc;vertical-align:top;width:38%;">
      <span style="font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#9b7d5a;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</span>
    </td>
    <td style="padding:10px 20px 10px 8px;border-bottom:1px solid #f0e8dc;vertical-align:top;">
      <span style="font-size:14px;color:#2e1f10;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(text)}</span>
    </td>
  </tr>`;
}

function buildSection(title, rows) {
  const content = rows.filter(Boolean).join("");
  if (!content.trim()) return "";
  return `
  <div style="margin-bottom:16px;border:1px solid #e8ddd0;border-radius:10px;overflow:hidden;background:#ffffff;">
    <div style="padding:9px 20px;background:#f9f4ed;border-bottom:1px solid #e8ddd0;">
      <span style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a07840;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(title)}</span>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#ffffff;">
      <tbody>${content}</tbody>
    </table>
  </div>`;
}

function buildEmailShell(headerTitle, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(BRAND_NAME)}</title>
</head>
<body style="margin:0;padding:0;background:#f5ede0;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">
    <div style="background:#231610;border-radius:12px 12px 0 0;padding:24px 28px;margin-bottom:0;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:6px;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(BRAND_NAME)}
      </div>
      <div style="font-size:21px;font-weight:700;color:#f8f0e3;line-height:1.25;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(headerTitle)}
      </div>
    </div>
    <div style="background:#fdfaf5;border:1px solid #e8ddd0;border-top:none;border-radius:0 0 12px 12px;padding:24px 20px 28px;">
      ${bodyContent}
    </div>
    <div style="text-align:center;padding:14px 0 4px;font-size:11px;color:#b8a090;font-family:Arial,Helvetica,sans-serif;">
      ${escapeHtml(BRAND_NAME)} &nbsp;·&nbsp; Philippine Heritage Tourism
    </div>
  </div>
</body>
</html>`;
}

// ─── Admin email ──────────────────────────────────────────────────────────────

function buildAdminHtml(inquiry) {
  const startFmt = formatTravelDate(inquiry.startDate);
  const endFmt = formatTravelDate(inquiry.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "";

  const messageSection = inquiry.message && inquiry.message.trim()
    ? `<div style="margin-bottom:16px;border:1px solid #e8ddd0;border-radius:10px;overflow:hidden;background:#ffffff;">
        <div style="padding:9px 20px;background:#f9f4ed;border-bottom:1px solid #e8ddd0;">
          <span style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a07840;font-family:Arial,Helvetica,sans-serif;">Client Message</span>
        </div>
        <div style="padding:16px 20px;font-size:14px;color:#2e1f10;line-height:1.75;font-style:italic;font-family:Arial,Helvetica,sans-serif;">
          &ldquo;${escapeHtml(inquiry.message.trim())}&rdquo;
        </div>
      </div>`
    : "";

  const clientSection = buildSection("Client Information", [
    buildRow("Name", formatValue(inquiry.name)),
    buildRow("Email", formatValue(inquiry.email)),
    buildRow("Phone", inquiry.phone),
    buildRow("Country Code", inquiry.countryCode),
  ]);

  const tripSection = buildSection("Inquiry Details", [
    buildRow("Inquiry Type", inquiry.inquiryType),
    buildRow("Destination", inquiry.destination),
    buildRow("Travel Dates", travelDates),
  ]);

  const metaSection = buildSection("Submission Info", [
    buildRow("Inquiry ID", formatValue(inquiry.id)),
    buildRow("Received", formatPhilippineDateTime(inquiry.createdAt)),
    buildRow("Status", formatValue(inquiry.status)),
    buildRow("Source", formatValue(inquiry.source)),
  ]);

  const intro = `<p style="font-size:14px;color:#4a3828;margin:0 0 20px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
    A new contact inquiry was submitted through the Heritage Philippines website. Please review the details below and follow up with the client.
  </p>`;

  return buildEmailShell(
    "New Contact Inquiry",
    `${intro}${clientSection}${tripSection}${messageSection}${metaSection}`,
  );
}

function buildAdminContactEmail(inquiry, adminEmail) {
  const subject = `New contact inquiry — ${formatValue(inquiry.name, "a traveler")}`;
  const html = buildAdminHtml(inquiry);

  const startFmt = formatTravelDate(inquiry.startDate);
  const endFmt = formatTravelDate(inquiry.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "Not provided";

  const text = [
    "New contact inquiry — Heritage Philippines",
    "",
    "CLIENT INFORMATION",
    `Name: ${formatValue(inquiry.name)}`,
    `Email: ${formatValue(inquiry.email)}`,
    `Phone: ${formatValue(inquiry.phone)}`,
    `Country Code: ${formatValue(inquiry.countryCode)}`,
    "",
    "INQUIRY DETAILS",
    `Inquiry Type: ${formatValue(inquiry.inquiryType)}`,
    `Destination: ${formatValue(inquiry.destination)}`,
    `Travel Dates: ${travelDates}`,
    "",
    "MESSAGE",
    formatValue(inquiry.message),
    "",
    "SUBMISSION INFO",
    `Inquiry ID: ${formatValue(inquiry.id)}`,
    `Received: ${formatPhilippineDateTime(inquiry.createdAt)}`,
    `Status: ${formatValue(inquiry.status)}`,
  ].join("\n");

  return { to: adminEmail, subject, html, text };
}

// ─── Client confirmation email ────────────────────────────────────────────────

function buildClientHtml(inquiry) {
  const startFmt = formatTravelDate(inquiry.startDate);
  const endFmt = formatTravelDate(inquiry.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "";

  const summarySection = buildSection("Your Inquiry Summary", [
    buildRow("Name", formatValue(inquiry.name)),
    buildRow("Email", formatValue(inquiry.email)),
    buildRow("Phone", inquiry.phone),
    buildRow("Inquiry Type", inquiry.inquiryType),
    buildRow("Destination", inquiry.destination),
    buildRow("Travel Dates", travelDates),
  ]);

  const messageSection = inquiry.message && inquiry.message.trim()
    ? `<div style="margin-bottom:16px;border:1px solid #e8ddd0;border-radius:10px;overflow:hidden;background:#ffffff;">
        <div style="padding:9px 20px;background:#f9f4ed;border-bottom:1px solid #e8ddd0;">
          <span style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a07840;font-family:Arial,Helvetica,sans-serif;">Your Message</span>
        </div>
        <div style="padding:16px 20px;font-size:14px;color:#2e1f10;line-height:1.75;font-style:italic;font-family:Arial,Helvetica,sans-serif;">
          &ldquo;${escapeHtml(inquiry.message.trim())}&rdquo;
        </div>
      </div>`
    : "";

  const refSection = buildSection("Reference", [
    buildRow("Inquiry ID", formatValue(inquiry.id)),
    buildRow("Submitted", formatPhilippineDateTime(inquiry.createdAt)),
  ]);

  const body = `
    <p style="font-size:15px;color:#4a3828;margin:0 0 6px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Dear ${escapeHtml(formatValue(inquiry.name, "Traveler"))},
    </p>
    <p style="font-size:14px;color:#4a3828;margin:0 0 20px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Thank you for reaching out to ${escapeHtml(BRAND_NAME)}. Your inquiry has been received, and our team will review your details carefully. We will be in touch with you within two business days.
    </p>
    ${summarySection}
    ${messageSection}
    ${refSection}
    <p style="font-size:13px;color:#9b7d5a;margin:20px 0 0;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Warm regards,<br>
      <strong style="color:#4a3828;">${escapeHtml(BRAND_NAME)}</strong>
    </p>`;

  return buildEmailShell("We received your inquiry", body);
}

function buildClientContactEmail(inquiry) {
  const subject = `We received your Heritage Philippines inquiry`;
  const html = buildClientHtml(inquiry);

  const startFmt = formatTravelDate(inquiry.startDate);
  const endFmt = formatTravelDate(inquiry.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "Not provided";

  const text = [
    `Dear ${formatValue(inquiry.name, "Traveler")},`,
    "",
    `Thank you for reaching out to ${BRAND_NAME}. Your inquiry has been received, and our team will review your details carefully.`,
    "",
    "We will get back to you within two business days.",
    "",
    "YOUR INQUIRY SUMMARY",
    `Name: ${formatValue(inquiry.name)}`,
    `Email: ${formatValue(inquiry.email)}`,
    `Phone: ${formatValue(inquiry.phone)}`,
    `Inquiry Type: ${formatValue(inquiry.inquiryType)}`,
    `Destination: ${formatValue(inquiry.destination)}`,
    `Travel Dates: ${travelDates}`,
    "",
    "YOUR MESSAGE",
    formatValue(inquiry.message),
    "",
    "REFERENCE",
    `Inquiry ID: ${formatValue(inquiry.id)}`,
    `Submitted: ${formatPhilippineDateTime(inquiry.createdAt)}`,
    "",
    "Warm regards,",
    BRAND_NAME,
  ].join("\n");

  return { to: inquiry.email, subject, html, text };
}

// ─── Transport ────────────────────────────────────────────────────────────────

async function sendEmail(email) {
  const config = getEmailConfig();
  const resend = new Resend(config.apiKey);

  const { data, error } = await resend.emails.send({
    from: config.from,
    to: Array.isArray(email.to) ? email.to : [email.to],
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(error.message || JSON.stringify(error));
  }

  return data;
}

export async function sendContactNotifications(inquiry) {
  const config = getEmailConfig();

  if (!config.enabled) {
    console.info(`[contact] Email notifications skipped for ${inquiry.id}: disabled.`);
    return { status: "skipped", reason: "disabled" };
  }

  if (!config.apiKey || !config.from || !config.adminEmail) {
    console.warn(
      `[contact] Email notifications skipped for ${inquiry.id}: missing email configuration.`,
    );
    return { status: "skipped", reason: "missing_configuration" };
  }

  const emails = [
    buildAdminContactEmail(inquiry, config.adminEmail),
    buildClientContactEmail(inquiry),
  ];

  const results = await Promise.allSettled(emails.map((email) => sendEmail(email)));
  const failures = results.filter((r) => r.status === "rejected");

  if (failures.length > 0) {
    console.error(
      `[contact] Email notifications partially failed for ${inquiry.id}:`,
      failures.map((f) => f.reason?.message || String(f.reason)).join(" | "),
    );
    return {
      status: "partial_failed",
      sent: results.length - failures.length,
      failed: failures.length,
    };
  }

  console.info(`[contact] Email notifications sent for ${inquiry.id}.`);
  return { status: "sent", sent: results.length };
}
