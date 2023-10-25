import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import producerRoutes from "./routes/producer.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use('/api',authRoutes);
app.use('/api',productRoutes);
app.use('/api',producerRoutes);
app.use('/api',orderRoutes);

export default app;