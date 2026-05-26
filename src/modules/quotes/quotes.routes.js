import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ module: "quotes", status: "placeholder" });
});

export default router;
