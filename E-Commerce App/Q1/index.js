const express = require("express");
const fs = require("fs");
const productRoutes = require("./routes/products.routes");
const orderRoutes = require("./routes/orders.routes");


const app = express();
app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
})