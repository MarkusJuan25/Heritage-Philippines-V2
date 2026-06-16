import { Resend } from "resend";

const BRAND_NAME = "Heritage Philippines";

// ─── Escaping / formatting ────────────────────────────────────────────────────

function escapeHtml(value = "") {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
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

// Converts a YYYY-MM-DD string to a readable date like "June 20, 2026".
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
    adminEmail: process.env.QUOTE_ADMIN_EMAIL || "",
  };
}

// ─── HTML building blocks ─────────────────────────────────────────────────────

// Returns a labelled row; omits the row entirely when value is blank.
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

// Returns a section card with a header and table rows; omits when all rows are empty.
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

// Wraps the entire email in a shared shell with header branding.
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

    <!-- Header -->
    <div style="background:#231610;border-radius:12px 12px 0 0;padding:24px 28px;margin-bottom:0;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:6px;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(BRAND_NAME)}
      </div>
      <div style="font-size:21px;font-weight:700;color:#f8f0e3;line-height:1.25;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(headerTitle)}
      </div>
    </div>

    <!-- Body -->
    <div style="background:#fdfaf5;border:1px solid #e8ddd0;border-top:none;border-radius:0 0 12px 12px;padding:24px 20px 28px;">
      ${bodyContent}
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:14px 0 4px;font-size:11px;color:#b8a090;font-family:Arial,Helvetica,sans-serif;">
      ${escapeHtml(BRAND_NAME)} &nbsp;·&nbsp; Philippine Heritage Tourism
    </div>

  </div>
</body>
</html>`;
}

// ─── Admin email ──────────────────────────────────────────────────────────────

function buildAdminHtml(quote) {
  // Format travel date range
  const startFmt = formatTravelDate(quote.startDate);
  const endFmt = formatTravelDate(quote.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "";

  // Selected programs block (My Journey)
  const programs = Array.isArray(quote.selectedPrograms) ? quote.selectedPrograms : [];
  const programsSection = programs.length > 0
    ? `<div style="margin-bottom:16px;border:1px solid #e8ddd0;border-radius:10px;overflow:hidden;background:#ffffff;">
        <div style="padding:9px 20px;background:#f9f4ed;border-bottom:1px solid #e8ddd0;">
          <span style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a07840;font-family:Arial,Helvetica,sans-serif;">My Journey — Selected Programs</span>
        </div>
        <div style="padding:4px 0;">
          ${programs.map((p) => {
            const meta = [p.location, p.duration].filter(Boolean).join(" · ");
            return `<div style="padding:9px 20px;border-bottom:1px solid #f5ede0;display:flex;gap:12px;">
              <span style="color:#c9a84c;font-size:13px;flex-shrink:0;font-family:Arial,Helvetica,sans-serif;margin-top:1px;">&#10003;</span>
              <div>
                <div style="font-size:14px;font-weight:600;color:#2e1f10;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(p.title || "")}</div>
                ${meta ? `<div style="font-size:12px;color:#9b7d5a;margin-top:2px;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(meta)}</div>` : ""}
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>`
    : "";

  // Client message block
  const messageSection = quote.message && quote.message.trim()
    ? `<div style="margin-bottom:16px;border:1px solid #e8ddd0;border-radius:10px;overflow:hidden;background:#ffffff;">
        <div style="padding:9px 20px;background:#f9f4ed;border-bottom:1px solid #e8ddd0;">
          <span style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a07840;font-family:Arial,Helvetica,sans-serif;">Client Message</span>
        </div>
        <div style="padding:16px 20px;font-size:14px;color:#2e1f10;line-height:1.75;font-style:italic;font-family:Arial,Helvetica,sans-serif;">
          &ldquo;${escapeHtml(quote.message.trim())}&rdquo;
        </div>
      </div>`
    : "";

  const clientSection = buildSection("Client Information", [
    buildRow("Name", formatValue(quote.name)),
    buildRow("Email", formatValue(quote.email)),
    buildRow("Phone", quote.phone),
  ]);

  const tripSection = buildSection("Trip Details", [
    buildRow("Destination", formatValue(quote.destination)),
    buildRow("Province", quote.province),
    buildRow("Source / Package", quote.source),
    buildRow("Package Style", quote.packageStyle),
    buildRow("Group Size", quote.groupSize ? String(quote.groupSize) : ""),
    buildRow("Travel Dates", travelDates),
  ]);

  const metaSection = buildSection("Submission Info", [
    buildRow("Quote ID", formatValue(quote.id)),
    buildRow("Received", formatPhilippineDateTime(quote.createdAt)),
    buildRow("Status", formatValue(quote.status)),
  ]);

  const intro = `<p style="font-size:14px;color:#4a3828;margin:0 0 20px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
    A new quote request was submitted through the Heritage Philippines website. Please review the details below and follow up with the client.
  </p>`;

  return buildEmailShell(
    "New Quote Request",
    `${intro}${clientSection}${tripSection}${programsSection}${messageSection}${metaSection}`,
  );
}

function buildAdminQuoteEmail(quote, adminEmail) {
  const subject = `New quote request — ${formatValue(quote.name, "a traveler")}`;
  const html = buildAdminHtml(quote);

  // Plain-text fallback
  const programs = Array.isArray(quote.selectedPrograms) ? quote.selectedPrograms : [];
  const programsText =
    programs.length > 0
      ? [
          "",
          "MY JOURNEY — SELECTED PROGRAMS",
          ...programs.map((p) => {
            const meta = [p.location, p.duration].filter(Boolean).join(" / ");
            return `  ✓ ${p.title}${meta ? ` (${meta})` : ""}`;
          }),
        ].join("\n")
      : "";

  const startFmt = formatTravelDate(quote.startDate);
  const endFmt = formatTravelDate(quote.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "Not provided";

  const text = [
    "New quote request — Heritage Philippines",
    "",
    "CLIENT INFORMATION",
    `Name: ${formatValue(quote.name)}`,
    `Email: ${formatValue(quote.email)}`,
    `Phone: ${formatValue(quote.phone)}`,
    "",
    "TRIP DETAILS",
    `Destination: ${formatValue(quote.destination)}`,
    `Province: ${formatValue(quote.province)}`,
    `Package Style: ${formatValue(quote.packageStyle)}`,
    `Group Size: ${formatValue(quote.groupSize)}`,
    `Travel Dates: ${travelDates}`,
    programsText,
    "",
    "MESSAGE",
    formatValue(quote.message),
    "",
    "SUBMISSION INFO",
    `Quote ID: ${formatValue(quote.id)}`,
    `Received: ${formatPhilippineDateTime(quote.createdAt)}`,
    `Status: ${formatValue(quote.status)}`,
  ].join("\n");

  return { to: adminEmail, subject, html, text };
}

// ─── Client confirmation email ────────────────────────────────────────────────

function buildClientHtml(quote) {
  const startFmt = formatTravelDate(quote.startDate);
  const endFmt = formatTravelDate(quote.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "";

  const summarySection = buildSection("Your Request Summary", [
    buildRow("Destination", formatValue(quote.destination)),
    buildRow("Travel Dates", travelDates),
    buildRow("Package Style", quote.packageStyle),
    buildRow("Group Size", quote.groupSize ? String(quote.groupSize) : ""),
  ]);

  const body = `
    <p style="font-size:15px;color:#4a3828;margin:0 0 6px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Dear ${escapeHtml(formatValue(quote.name, "Traveler"))},
    </p>
    <p style="font-size:14px;color:#4a3828;margin:0 0 20px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Thank you for reaching out to ${escapeHtml(BRAND_NAME)}. Your quote request has been received, and our team will review your travel details carefully. We will be in touch with you as soon as possible.
    </p>
    ${summarySection}
    <p style="font-size:13px;color:#9b7d5a;margin:20px 0 0;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
      Warm regards,<br>
      <strong style="color:#4a3828;">${escapeHtml(BRAND_NAME)}</strong>
    </p>`;

  return buildEmailShell("Quote Request Received", body);
}

function buildClientQuoteEmail(quote) {
  const subject = `We received your ${BRAND_NAME} quote request`;
  const html = buildClientHtml(quote);

  const startFmt = formatTravelDate(quote.startDate);
  const endFmt = formatTravelDate(quote.endDate);
  const travelDates =
    startFmt && endFmt ? `${startFmt} – ${endFmt}` : startFmt || endFmt || "Not provided";

  const text = [
    `Dear ${formatValue(quote.name, "Traveler")},`,
    "",
    `Thank you for reaching out to ${BRAND_NAME}. Your quote request has been received, and our team will review your travel details carefully.`,
    "",
    "We will get back to you as soon as possible with the next steps.",
    "",
    "YOUR REQUEST SUMMARY",
    `Destination: ${formatValue(quote.destination)}`,
    `Travel Dates: ${travelDates}`,
    `Package Style: ${formatValue(quote.packageStyle)}`,
    `Group Size: ${formatValue(quote.groupSize)}`,
    "",
    "Warm regards,",
    BRAND_NAME,
  ].join("\n");

  return { to: quote.email, subject, html, text };
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

export async function sendQuoteNotifications(quote) {
  const config = getEmailConfig();

  if (!config.enabled) {
    console.info(`[quotes] Email notifications skipped for ${quote.id}: disabled.`);
    return { status: "skipped", reason: "disabled" };
  }

  if (!config.apiKey || !config.from || !config.adminEmail) {
    console.warn(`[quotes] Email notifications skipped for ${quote.id}: missing email configuration.`);
    return { status: "skipped", reason: "missing_email_configuration" };
  }

  const emails = [
    buildAdminQuoteEmail(quote, config.adminEmail),
    buildClientQuoteEmail(quote),
  ];

  const results = await Promise.allSettled(emails.map((email) => sendEmail(email)));
  const failures = results.filter((result) => result.status === "rejected");

  if (failures.length > 0) {
    console.error(
      `[quotes] Email notifications partially failed for ${quote.id}:`,
      failures.map((failure) => failure.reason?.message || String(failure.reason)).join(" | "),
    );
    return {
      status: "partial_failed",
      sent: results.length - failures.length,
      failed: failures.length,
    };
  }

  console.info(`[quotes] Email notifications sent for ${quote.id}.`);
  return { status: "sent", sent: results.length };
}
