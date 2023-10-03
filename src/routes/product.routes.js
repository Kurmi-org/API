import { Router } from "express";

import { 
    createProduct, 
    getProducts,
    getProductById,
    getProductsByProducer

} from "../controllers/product.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/createProduct",authRequired, createProduct);
router.get("/getProduct", getProducts);
router.get("/getProduct/:id", getProductById);
router.get("/getProductsByProducer/:id", authRequired, getProductsByProducer);

export default router;