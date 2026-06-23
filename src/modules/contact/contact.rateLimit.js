const CONTACT_BURST_WINDOW_MS = 60 * 1000;
const CONTACT_BURST_MAX = 5;
const CONTACT_HOURLY_WINDOW_MS = 60 * 60 * 1000;
const CONTACT_HOURLY_MAX = 20;

const contactRateLimitStore = new Map();

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
  const cutoff = Date.now() - CONTACT_HOURLY_WINDOW_MS;
  for (const [key, timestamps] of contactRateLimitStore) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      contactRateLimitStore.delete(key);
    } else {
      contactRateLimitStore.set(key, fresh);
    }
  }
}, CONTACT_HOURLY_WINDOW_MS);

if (cleanupInterval.unref) cleanupInterval.unref();

export function contactRateLimit(req, res, next) {
  const key = getClientKey(req);
  const now = Date.now();

  const raw = contactRateLimitStore.get(key) ?? [];
  const hourly = pruneOldTimestamps(raw, CONTACT_HOURLY_WINDOW_MS, now);
  const burst = pruneOldTimestamps(hourly, CONTACT_BURST_WINDOW_MS, now);

  if (burst.length >= CONTACT_BURST_MAX) {
    const oldest = burst[0];
    const retryAfter = Math.ceil((oldest + CONTACT_BURST_WINDOW_MS - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      message: "Too many contact submissions. Please try again later.",
    });
  }

  if (hourly.length >= CONTACT_HOURLY_MAX) {
    const oldest = hourly[0];
    const retryAfter = Math.ceil((oldest + CONTACT_HOURLY_WINDOW_MS - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      message: "Too many contact submissions. Please try again later.",
    });
  }

  hourly.push(now);
  contactRateLimitStore.set(key, hourly);
  next();
}
