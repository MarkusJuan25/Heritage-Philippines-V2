const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const MAX_TURNSTILE_TOKEN_LENGTH = 2048;

function isTurnstileDisabled() {
  return process.env.TURNSTILE_ENABLED === "false";
}

function getClientIp(req) {
  return req.ip || req.socket?.remoteAddress || undefined;
}

function getTurnstileToken(req) {
  return (
    req.body?.turnstileToken ||
    req.body?.["cf-turnstile-response"] ||
    ""
  );
}

async function validateTurnstileToken(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      success: false,
      errorCodes: ["missing-secret"],
    };
  }

  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        errorCodes: ["siteverify-unavailable"],
      };
    }

    const result = await response.json();

    return {
      success: Boolean(result.success),
      errorCodes: result["error-codes"] ?? [],
    };
  } catch {
    return {
      success: false,
      errorCodes: ["siteverify-request-failed"],
    };
  }
}

export async function requireTurnstile(req, res, next) {
  if (isTurnstileDisabled()) {
    return next();
  }

  const token = getTurnstileToken(req).trim();

  if (!token || token.length > MAX_TURNSTILE_TOKEN_LENGTH) {
    return res.status(400).json({
      message: "Security check failed. Please refresh and try again.",
    });
  }

  const result = await validateTurnstileToken(token, getClientIp(req));

  if (!result.success) {
    return res.status(400).json({
      message: "Security check failed. Please refresh and try again.",
    });
  }

  delete req.body.turnstileToken;
  delete req.body["cf-turnstile-response"];

  next();
}
