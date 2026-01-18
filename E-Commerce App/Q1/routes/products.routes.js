const express = require("express");
const fs = require("fs");
const router = express.Router();

const readDB = () =>JSON.parse(fs.readFileSync("db.json","utf-8"));
const writeDB = (data) =>fs.writeFileSync('db.json', JSON.stringify(data, null, 2));

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

module.exports = router;