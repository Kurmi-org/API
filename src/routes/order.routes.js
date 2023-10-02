import { Router } from "express";

import {
    createOrder,
    getOrders,
    getOrderById
} from "../controllers/order.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);

export default router;
