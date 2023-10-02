import { Router } from "express";

import { 
    createProduct, 
    getProducts,
    getProductById

} from "../controllers/product.controller.js";

const router = Router();

router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.get("/getProduct/:id", getProductById);

export default router;