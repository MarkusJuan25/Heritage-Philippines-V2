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
  if (missing.length) {
    console.error("[env] missing required production config:", missing);
    process.exit(1);
  }
}
