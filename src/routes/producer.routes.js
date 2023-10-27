import { Router } from "express";
import {
    getProducer,
    getProducerById,
    updateProducerById,
    updateProducer,
    deleteProducerById,
} from "../controllers/producer.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//el getProducer esta abierto si el admin esta logueado
router.get("/getProducer", authRequired, getProducer);
//el getProducerById esta abierto para todos
router.get("/getProducerById/:id", getProducerById);
//el updateProducerById esta abierto si el admin esta logueado
router.put("/updateProducerById/:id", authRequired, updateProducerById);
//el updateProducer esta abierto si el productor esta logueado
router.put("/updateProducer", authRequired, updateProducer);
//el deleteProducerById esta abierto si el admin esta logueado
router.delete("/deleteProducerById/:id", authRequired, deleteProducerById);



export default router;