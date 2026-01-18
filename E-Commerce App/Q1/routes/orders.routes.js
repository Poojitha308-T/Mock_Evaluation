import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
const router = Router();

const readDB = () => JSON.parse(readFileSync("db.json","utf-8"));

const writeDB = (data) => writeFileSync("db.json",JSON.stringify(data, null, 2));

router.post("/",(req,res) => {
    const { productId, quantity } = req.body;
    const db = readDB();

    const product = db.products.find(p => p.id === productId);
    if(!product){
        return res.status(404).json({msg: "Product not found"});
    }

    if(product.stock === 0 || quantity> product.stock){
        return res.status(400).json({msg: "Insufficient stock"});
    }

    const totalAmount = product.price * quantity;

    product.stock -= quantity;

    const order = {
        id: Date.now(),
        productId,
        quantity,
        totalAmount,
        status: "placed",
        createdAt: new Date().toISOString().split("T")[0]
    };

    db.orders.push(order);
    writeDB(db);

    res.status(201).json(order);

});

router.get("/",(req,res) => {
    const db = readDB();
    res.json(db.orders);
});

router.delete("/:orderId", (req, res) => {
    const db = readDB();
    const order = db.orders.find( o =>o.id == req.params.orderId);

    if(!order){
        return res.status(404).json({msg: "Order Not Found"});
    }

    if(order.status === "cancelled"){
        return res.status(400).json({msg: "Already cancelled"});
    }

    const today = new Date().toISOString().split("T")[0];
    if(order.createdAt !== today){
        return res.status(400).json({msg: "Cancellation not allowed"});
    }

    order.status = "cancelled";

    const product = db.products.find(p => p.id === order.productId);
    product.stock += order.quantity;

    writeDB(db);
    res.json({msg: "Order cancelled"});
});

router.patch("/change-status/:orderId", (req, res) => {
    const { status } = req.body;
    const db = readDB();
    const order = db.orders.find(o => o.id == req.params.orderId);

    if(!order){
        return res.status(404).json({msg: "Order not Found"});
    }

    if(["cancelled", "delivered"].includes(order.status)){
        return res.status(400).json({msg: "Status change not allowed"});
    }

    const validFlow = {
        placed: "shipped",
        shipped: "delivered"
    };

    if(validFlow[order.status] !== status){
        return res.status(400).json({msg: "Invalid status Flow"});
    }

    order.status = status;
    writeDB(db);
    res.json(order);
});

export default router;