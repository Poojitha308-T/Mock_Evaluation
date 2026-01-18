import { Router } from "express";
import fs from "fs";
const router = Router();

const readDB = () =>JSON.parse(fs.readFileSync("db.json", "utf-8"));

router.get("/allorders",(req,res) => {
    const db = readDB();
    res.json({
        count: db.orders.length,
        orders: db.orders
    });
});

router.get("/cancelled-orders", (req,res) => {
    const db = readDB();
    const cancelled = db.orders.filter(o => o.status === "cancelled");
});

export default router;