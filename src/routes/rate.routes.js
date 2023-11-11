
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
    updateRate
} from "../controllers/rate.controller.js";

const router = Router();


router.put("/updateRate", updateRate);

export default router;

