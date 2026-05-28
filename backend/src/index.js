import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";

import { shopifyApp, ApiVersion } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";

import { db } from "../db/index.js";
import { favorites } from "../db/schema.js";
import { eq } from "drizzle-orm";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- 1. GLOBAL CORS CONFIGURATIONS ---------------- */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://perspecteev.myshopify.com",
    "http://localhost:5173",
    "https://thirsting-quotable-cheek.ngrok-free.dev"
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers", 
    "Content-Type, Authorization, X-Shopify-Access-Token, ngrok-skip-browser-warning"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

/* ---------------- 2. PUBLIC API ENDPOINTS (BYPASSES AUTH) ---------------- */

app.get("/api/public/favorites", async (req, res) => {
  try {
    const data = await db.select().from(favorites);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Public Fetch Error:", error);
    return res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

app.post("/api/public/favorites", async (req, res) => {
  try {
    // DESTUCTURE THE NEW RUNTIME INCOMING PROPERTIES:
    const { productId, productTitle, productHandle, productImage, productPrice } = req.body;
    
    await db.insert(favorites).values({
      customerId: "1", 
      productId,
      productTitle,
      productHandle, // Saved to DB
      productImage,  // Saved to DB
      productPrice,  // Saved to DB
    });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Public Insert Error:", error);
    return res.status(500).json({ error: "Failed to add favorite" });
  }
});

app.delete("/api/public/favorites/:id", async (req, res) => {
  try {
    await db.delete(favorites).where(eq(favorites.id, req.params.id));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Public Delete Error:", error);
    return res.status(500).json({ error: "Failed to delete favorite" });
  }
});

/* ---------------- 3. SHOPIFY SETUP ---------------- */
const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ["read_products"],
    hostName: process.env.HOST.replace(/https?:\/\//, ""),
    apiVersion: ApiVersion.April26,
  },
  auth: {
    path: "/auth",
    callbackPath: "/auth/callback",
  },
  sessionStorage: new SQLiteSessionStorage("./shopify_sessions.sqlite"),
});

/* ---------------- 4. AUTH & ROUTE FLOWS ---------------- */
app.get("/auth", shopify.auth.begin());
app.get("/auth/callback", shopify.auth.callback(), (req, res) => {
  const { shop } = res.locals.shopify.session;
  res.redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`);
});

/* ---------------- 5. PROTECTED MERCHANT DASHBOARD ROUTES ---------------- */
app.use(/^\/api\/admin\/.*/, shopify.validateAuthenticatedSession());

app.get("/api/admin/dashboard-stats", (req, res) => {
  res.json({ success: true, message: "Connected to Admin Secure Route" });
});

/* ---------------- 6. FRONTEND DIST & ROOT CATCH-ALL ---------------- */
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get(/^.*/, shopify.ensureInstalledOnShop(), (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});