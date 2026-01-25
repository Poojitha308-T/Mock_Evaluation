import express from 'express';
import cors  from 'cors';
import customerRoutes from './routes/customer.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

app.listen(3000, () => {
    console.log("Server running");
})