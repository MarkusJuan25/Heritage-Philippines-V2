import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5174",
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTtl: process.env.JWT_ACCESS_TTL || "15m",
    refreshTtl: process.env.JWT_REFRESH_TTL || "30d",
  },
};

if (env.nodeEnv === "production") {
  const missing = [];
  if (!env.databaseUrl) missing.push("DATABASE_URL");
  if (!env.jwt.accessSecret || env.jwt.accessSecret.length < 32)
    missing.push("JWT_ACCESS_SECRET (>=32 chars)");
  if (!env.jwt.refreshSecret || env.jwt.refreshSecret.length < 32)
    missing.push("JWT_REFRESH_SECRET (>=32 chars)");
  if (!process.env.CLIENT_URL) missing.push("CLIENT_URL");
  if (
    process.env.TURNSTILE_ENABLED !== "false" &&
    !process.env.TURNSTILE_SECRET_KEY
  ) {
    missing.push("TURNSTILE_SECRET_KEY (or set TURNSTILE_ENABLED=false)");
  }
  // Email notifications (validated only when EMAIL_NOTIFICATIONS_ENABLED=true)
  if (process.env.EMAIL_NOTIFICATIONS_ENABLED === "true") {
    if (!process.env.RESEND_API_KEY) {
      missing.push("RESEND_API_KEY");
    }
    if (!process.env.EMAIL_FROM) {
      missing.push("EMAIL_FROM");
    }
    if (!process.env.QUOTE_ADMIN_EMAIL) {
      missing.push("QUOTE_ADMIN_EMAIL");
    }
    // CONTACT_ADMIN_EMAIL is optional; contact handler falls back to QUOTE_ADMIN_EMAIL
  }

  if (missing.length) {
    console.error("[env] missing required production config:", missing);
    process.exit(1);
  }
}
