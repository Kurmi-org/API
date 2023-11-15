
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
    updateRate,
    getRate
} from "../controllers/rate.controller.js";

const router = Router();


router.put("/updateRate", updateRate);
router.get("/getRate", getRate);    

export default router;

