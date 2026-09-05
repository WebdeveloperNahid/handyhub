
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '1.0.0.1']); 

import express, { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import { dbMiddleware } from "./src/config/db";
import authRoutes from "./src/routes/auth.routes";
import customerRoutes from "./src/routes/customer.routes";
import providerRoutes from "./src/routes/provider.routes";
import adminRoutes from "./src/routes/admin.routes";

dotenv.config();
console.log("Starting server...");

const app = express();
const port = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());

// Database connection middleware
app.use(dbMiddleware);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("HandyHub Server is running!");
});

// Modular Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/provider", providerRoutes);
app.use("/api/v1/admin", adminRoutes);

// Also mount root route aliases for convenience
app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/admin", adminRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`HandyHub Server listening on port ${port}`);
  });
}

export default app;