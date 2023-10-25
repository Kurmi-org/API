import Router from 'express';

import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from '../middlewares/validator.middleware.js';
import { registerClientSchema, loginSchema } from '../schemas/auth.schema.js';

import { 
    registerClient,
    registerProducer, 
    getProfile,
    login, 
    logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/registerClient', validatorSchema(registerClientSchema), registerClient)
router.post('/registerProducer', authRequired, registerProducer)
router.get('/getProfile', authRequired, getProfile)
router.post('/login', validatorSchema(loginSchema), login)
router.post('/logout',logout)

export default router;