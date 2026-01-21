import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "db.json");

const readDB = () =>JSON.parse(fs.readFileSync(dbPath,"utf-8"));

const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post("/", (req,res) => {
    const { productId, quantity } = req.body;
    const db = readDB();

    const product = db.products.find(p => p.id === productId);

    if(!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if(product.stock === 0 || quantity > product.stock) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalAmount = product.price * quantity;

    const newOrder = {
        id: Date.now(),
        productId,
        quantity,
        totalAmount,
        status: "placed",
        createdAt: new Date(). toISOString().split("T")[0]
    };

    product.stock -= quantity;
    db.orders.push(newOrder);

    writeDB(db);
    res.status(201).json(newOrder);
});

router.get("/", (req,res) => {
    const db = readDB();
    const order = db.orders.find(o => o.id == req.params.orderId);

    if(!order){
        return res.status(404).json({message: "Order not found"});
    }

    if(order.status === "cancelled") {
        return res.status(400).json({message: "Order already cancelled"});
    }

    const today = new Date().toISOString().split("T")[0];
    if(order.createdAt !== today){
        return res.status(400).json({ message: "Cancellation not allowed" });
    }

    const product = db.products.find(p =>p.id === order.productId);
    product.stock += order.quantity;

    order.status = "cancelled";
    writeDB(db);

    res.json({ message: "Order cancelled successfully" });
});

router.patch("/change-status/:orderId", (req,res) => {
    const { status } = req.body;
    const db = readDB();
    const order = db.orders.find(o => o.id == req.params.orderId);

    if(!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if(["cancelled", "delivered"].includes(order.status)) {
        return res.status(400).json({ message: "Status change not allowed" });
    }

    const flow = ["placed", "shipped", "delivered"];
    const currentIndex = flow.indexOf(order.status);

    if(flow[currentIndex + 1] !== status) {
        return res.status(400).json({message: "Invalid status flow" });
    }

    order.status = status;
    writeDB(db);

    res.json(order);
});

export default router;