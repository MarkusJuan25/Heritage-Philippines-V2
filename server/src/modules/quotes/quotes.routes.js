import { Router } from "express";
import { createQuoteRequest } from "./quotes.service.js";
import { quoteRequestRateLimit } from "./quotes.rateLimit.js";
import { requireTurnstile } from "./quotes.turnstile.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    module: "quotes",
    status: "ready",
    endpoints: {
      create: "POST /api/quotes",
    },
  });
});

router.post("/", quoteRequestRateLimit, requireTurnstile, async (req, res, next) => {
  try {
    const quote = await createQuoteRequest(req.body);

    res.status(201).json({
      message: "Quote request received.",
      data: {
        quote,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;