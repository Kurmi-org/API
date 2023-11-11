import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import swagger from './swagger.js';

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import producerRoutes from "./routes/producer.routes.js";
import orderRoutes from "./routes/order.routes.js";
import clientRouter from "./routes/client.routes.js";
import rateRouter from "./routes/rate.routes.js";

const app = express();
swagger(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/api',authRoutes);
app.use('/api',productRoutes);
app.use('/api',producerRoutes);
app.use('/api',orderRoutes);
app.use('/api',clientRouter);
app.use('/api',rateRouter);

export default app;