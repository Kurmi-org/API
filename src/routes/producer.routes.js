import { Router } from "express";
import {
    getProducer,
    getProducerById
} from "../controllers/producer.controller.js";

const router = Router();

router.get("/getProducer", getProducer);
router.get("/getProducer/:id", getProducerById);

export default router;