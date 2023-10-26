import { Router } from "express";

import { 
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByProducer
    
} from "../controllers/product.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/getProducts", getProducts);
router.get("/getProductsByProducer/:id", getProductsByProducer);
router.get("/getProduct/:id", getProduct);
router.post("/createProduct",authRequired, createProduct);
router.put("/updateProduct/:id",authRequired, updateProduct);
router.delete("/deleteProduct/:id",authRequired, deleteProduct);


export default router;