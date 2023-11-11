import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    createOrder,
    getOrders,
    getOrderById,
    getSalesByProducer,
    getOrdersByStatus,
    updateOrderById,
    deleteOrderById,
    getOrdersByClient

} from "../controllers/order.controller.js";

const router = Router();

router.post("/createOrder",authRequired, createOrder);
router.get("/getOrders",authRequired,getOrders);
router.get("/getOrderById/:id", getOrderById);
router.get("/getSalesByProducer/:id",authRequired, getSalesByProducer);
router.get("/getOrdersByStatus/:status",authRequired, getOrdersByStatus);
router.put("/updateOrderById/:id",authRequired, updateOrderById);
router.delete("/deleteOrderById/:id",authRequired, deleteOrderById);
router.get("/getOrdersByClient",authRequired, getOrdersByClient);

export default router;
