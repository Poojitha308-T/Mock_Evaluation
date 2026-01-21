import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));

router.get("/allorders", (req,res) => {
    const db = readDB();
    let count = 0;

    db.orders.forEach(() => count++);

    res.json({count, orders:db.orders });
});

router.get("/cancelled-orders", (req,res) => {
    const db = readDB();
    const cancelled = db.orders.filter(o => o.status === "cancelled");

    res.json({ count: cancelled.length, orders: cancelled });
});

router.get("/shipped", (req,res) => {
    const db = readDB();
    const shipped = db.orders.filter(o => o.status === "shipped");

    res.json({count: shipped.length, orders: shipped });
});

router.get("/total-revenue/:productId", (req,res) => {
    const db = readDB();
    const product = db.products.find(p => p.id == req.params.productId);

    if(!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const totalRevenue = db.orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum+ o.quantity * product.price, 0);

    res.json({ productID: product.id, totalRevenue });
});

router.get("/alltotalrevenue", (req, res) => {
    const db = readDB();

    const totalRevenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

    res.json({ totalRevenue });
});

export default router;
