import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post("/", (req, res) => {
    const db = readDB();
    const newProduct = {id: Date.now(), ...req.body };

    db.products.push(newProduct);
    writeDB(db);

    res.status(201).json(newProduct);
});

router.get("/", (req, res) => {
    const db = readDB();
    res.json(db.products);
});

export default router;