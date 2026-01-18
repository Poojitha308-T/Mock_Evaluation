import express, { json } from "express";
import fs from "fs";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";


const app = express();
app.use(json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
})