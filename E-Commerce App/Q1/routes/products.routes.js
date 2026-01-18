import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
const router = Router();

const readDB = () =>JSON.parse(readFileSync("db.json","utf-8"));
const writeDB = (data) =>writeFileSync('db.json', JSON.stringify(data, null, 2));

router.post("/", (req,res) =>{
    const db = readDB();
    const product = {
        id: Date.now(),
        ...req.body
    };
    db.products.push(product);
    writeDB(db);
    res.status(201).json(product);
});

router.get("/", (req, res) => {
    const db = readDB();
    res.json(db.products);
});

export default router;