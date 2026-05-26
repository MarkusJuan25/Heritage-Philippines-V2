import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ module: "users", status: "placeholder" });
});

export default router;
