const QUOTE_BURST_WINDOW_MS = 60 * 1000;
const QUOTE_BURST_MAX = 5;
const QUOTE_HOURLY_WINDOW_MS = 60 * 60 * 1000;
const QUOTE_HOURLY_MAX = 20;

const quoteRateLimitStore = new Map();

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  if (req.ip) return req.ip;
  if (req.socket?.remoteAddress) return req.socket.remoteAddress;
  return "unknown";
}

function pruneOldTimestamps(timestamps, windowMs, now) {
  const cutoff = now - windowMs;
  return timestamps.filter((t) => t > cutoff);
}

const cleanupInterval = setInterval(() => {
  const cutoff = Date.now() - QUOTE_HOURLY_WINDOW_MS;
  for (const [key, timestamps] of quoteRateLimitStore) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      quoteRateLimitStore.delete(key);
    } else {
      quoteRateLimitStore.set(key, fresh);
    }
  }
}, QUOTE_HOURLY_WINDOW_MS);

if (cleanupInterval.unref) cleanupInterval.unref();

export function quoteRequestRateLimit(req, res, next) {
  const key = getClientKey(req);
  const now = Date.now();

  const raw = quoteRateLimitStore.get(key) ?? [];
  const hourly = pruneOldTimestamps(raw, QUOTE_HOURLY_WINDOW_MS, now);
  const burst = pruneOldTimestamps(hourly, QUOTE_BURST_WINDOW_MS, now);

  if (burst.length >= QUOTE_BURST_MAX) {
    const oldest = burst[0];
    const retryAfter = Math.ceil((oldest + QUOTE_BURST_WINDOW_MS - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      message: "Too many quote requests. Please try again later.",
    });
  }

  if (hourly.length >= QUOTE_HOURLY_MAX) {
    const oldest = hourly[0];
    const retryAfter = Math.ceil((oldest + QUOTE_HOURLY_WINDOW_MS - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      message: "Too many quote requests. Please try again later.",
    });
  }

  hourly.push(now);
  quoteRateLimitStore.set(key, hourly);
  next();
}
