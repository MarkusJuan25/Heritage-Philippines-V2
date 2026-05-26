import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import quoteRoutes from "./modules/quotes/quotes.routes.js";
import packageRoutes from "./modules/packages/packages.routes.js";
import bookingRoutes from "./modules/bookings/bookings.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

export const app = express();

app.use(helmet());

const devOrigins =
  env.nodeEnv !== "production"
    ? ["http://localhost:5174", "http://127.0.0.1:5174"]
    : [];
const allowedOrigins = [env.clientUrl, ...devOrigins];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);
