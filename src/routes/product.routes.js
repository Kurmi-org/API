import { Router } from "express";

import { 
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByProducer,
    updateStock,
    getProductsProducer
    
} from "../controllers/product.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/getProducts", getProducts);
router.get("/getProductsByProducer/:id", getProductsByProducer);
router.get("/getProduct/:id", getProduct);
router.get("/getProductsProducer", authRequired, getProductsProducer);
router.post("/createProduct",authRequired, createProduct);
router.put("/updateProduct/:id",authRequired, updateProduct);
router.put("/updateStock/:id",authRequired, updateStock);
router.delete("/deleteProduct/:id",authRequired, deleteProduct);


export default router;