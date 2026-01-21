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

    

})