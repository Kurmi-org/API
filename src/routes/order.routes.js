import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    createOrder,
    getOrders,
    getOrderById,
    getSalesByProducer,
    getOrdersByStatus
} from "../controllers/order.controller.js";

const router = Router();

router.post("/createOrder",authRequired, createOrder);
router.get("/getOrders",authRequired,getOrders);
router.get("/getOrderById/:id", getOrderById);
router.get("/getSalesByProducer/:id",authRequired, getSalesByProducer);
router.get("/getOrdersByStatus/:status",authRequired, getOrdersByStatus);

export default router;
