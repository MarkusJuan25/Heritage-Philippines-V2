import { Router } from "express";
import { createContactInquiry } from "./contact.service.js";
import { contactRateLimit } from "./contact.rateLimit.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    module: "contact",
    status: "ready",
    endpoints: {
      create: "POST /api/contact",
    },
  });
});

router.post("/", contactRateLimit, async (req, res, next) => {
  try {
    const inquiry = await createContactInquiry(req.body);

    res.status(201).json({
      message: "Contact inquiry received.",
      data: {
        id: inquiry.id,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
