import Router from 'express';
import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from '../middlewares/validator.middleware.js';

import { updateClient } from '../controllers/client.controller.js';

const router = Router();
//el updateClient solo se puede hacer si el usuario esta logueado
//y el usuario logueado es un cliente
router.put('/updateClient', authRequired, updateClient)