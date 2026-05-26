import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ module: "bookings", status: "placeholder" });
});

export default router;
