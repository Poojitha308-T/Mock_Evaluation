import express from "express";
import productsRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";

const app = express();
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);


app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})