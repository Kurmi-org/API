import { Router } from "express";
import {
    getProducer,
    getProducerById
} from "../controllers/producer.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/getProducer",authRequired, getProducer);
router.get("/getProducer/:id",authRequired, getProducerById);

export default router;