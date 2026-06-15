import { Resend } from "resend";

const BRAND_NAME = "Heritage Philippines";

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

function getEmailConfig() {
  return {
    enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.EMAIL_FROM || "",
    adminEmail: process.env.QUOTE_ADMIN_EMAIL || "",
  };
}

function buildQuoteRows(quote) {
  const rows = [
    ["Quote ID", quote.id],
    ["Name", quote.name],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Destination", quote.destination],
    ["Province", quote.province],
    ["Package Style", quote.packageStyle],
    ["Group Size", quote.groupSize],
    ["Start Date", quote.startDate],
    ["End Date", quote.endDate],
    ["Message", quote.message],
    ["Submitted At", quote.createdAt],
  ];

  return rows
    .map(([label, value]) => {
      return `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eadfcd; font-weight: 700; color: #5f4a32;">${escapeHtml(label)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eadfcd; color: #3c3025;">${escapeHtml(formatValue(value))}</td>
        </tr>
      `;
    })
    .join("");
}

function buildQuoteText(quote) {
  return [
    `Quote ID: ${formatValue(quote.id)}`,
    `Name: ${formatValue(quote.name)}`,
    `Email: ${formatValue(quote.email)}`,
    `Phone: ${formatValue(quote.phone)}`,
    `Destination: ${formatValue(quote.destination)}`,
    `Province: ${formatValue(quote.province)}`,
    `Package Style: ${formatValue(quote.packageStyle)}`,
    `Group Size: ${formatValue(quote.groupSize)}`,
    `Start Date: ${formatValue(quote.startDate)}`,
    `End Date: ${formatValue(quote.endDate)}`,
    `Message: ${formatValue(quote.message)}`,
    `Submitted At: ${formatValue(quote.createdAt)}`,
  ].join("\n");
}

function buildEmailShell(content) {
  return `
    <div style="margin: 0; padding: 32px; background: #f7f1e7; font-family: Georgia, 'Times New Roman', serif;">
      <div style="max-width: 680px; margin: 0 auto; background: #fffaf2; border: 1px solid #eadfcd; border-radius: 22px; overflow: hidden;">
        <div style="padding: 28px 32px; background: #2f2118; color: #f8ead2;">
          <div style="font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; color: #d4a23a;">${BRAND_NAME}</div>
          <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">Quote Request</h1>
        </div>
        <div style="padding: 30px 32px; color: #3c3025;">
          ${content}
        </div>
      </div>
    </div>
  `;
}

function buildAdminQuoteEmail(quote, adminEmail) {
  const subject = `New quote request from ${formatValue(quote.name, "a traveler")}`;

  const html = buildEmailShell(`
    <p style="font-size: 16px; line-height: 1.7; margin-top: 0;">
      A new quote request has been submitted through the Heritage Philippines website.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 22px; background: #fffdf8;">
      <tbody>
        ${buildQuoteRows(quote)}
      </tbody>
    </table>
  `);

  const text = [
    "A new quote request has been submitted through the Heritage Philippines website.",
    "",
    buildQuoteText(quote),
  ].join("\n");

  return {
    to: adminEmail,
    subject,
    html,
    text,
  };
}

function buildClientQuoteEmail(quote) {
  const subject = `We received your ${BRAND_NAME} quote request`;

  const html = buildEmailShell(`
    <p style="font-size: 17px; line-height: 1.7; margin-top: 0;">
      Dear ${escapeHtml(formatValue(quote.name, "Traveler"))},
    </p>

    <p style="font-size: 16px; line-height: 1.7;">
      Thank you for reaching out to ${BRAND_NAME}. Your quote request has been received, and our team will review your travel details carefully.
    </p>

    <p style="font-size: 16px; line-height: 1.7;">
      We will get back to you as soon as possible with the next steps.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 22px; background: #fffdf8;">
      <tbody>
        ${buildQuoteRows(quote)}
      </tbody>
    </table>

    <p style="font-size: 15px; line-height: 1.7; margin-top: 24px; color: #6d5a45;">
      Warm regards,<br />
      ${BRAND_NAME}
    </p>
  `);

  const text = [
    `Dear ${formatValue(quote.name, "Traveler")},`,
    "",
    `Thank you for reaching out to ${BRAND_NAME}. Your quote request has been received, and our team will review your travel details carefully.`,
    "",
    "We will get back to you as soon as possible with the next steps.",
    "",
    buildQuoteText(quote),
    "",
    `Warm regards,`,
    BRAND_NAME,
  ].join("\n");

  return {
    to: quote.email,
    subject,
    html,
    text,
  };
}

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

    return {
      status: "skipped",
      reason: "disabled",
    };
  }

  if (!config.apiKey || !config.from || !config.adminEmail) {
    console.warn(`[quotes] Email notifications skipped for ${quote.id}: missing email configuration.`);

    return {
      status: "skipped",
      reason: "missing_email_configuration",
    };
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

  return {
    status: "sent",
    sent: results.length,
  };
}
