import Router from 'express';

import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from '../middlewares/validator.middleware.js';
import { registerClientSchema, loginSchema } from '../schemas/auth.schema.js';

import { 
    registerClient,
    registerProducer, 
    getProfile,
    login, 
    logout,
    updatePassword

} from '../controllers/auth.controller.js';

const router = Router();

//el registerClient esta abierto para todos los usuarios
router.post('/registerClient', validatorSchema(registerClientSchema), registerClient)
//el registerProducer solo se puede hacer si el admin esta logueado
router.post('/registerProducer', authRequired, registerProducer)
//el getProfile solo se puede hacer si el usuario esta logueado
router.get('/getProfile', authRequired, getProfile)
//el login esta abierto para todos los usuarios
router.post('/login', validatorSchema(loginSchema), login)
//el logout solo se puede hacer si el usuario esta logueado
router.post('/logout',logout)
//el updatePassword solo se puede hacer si el usuario esta logueado
router.put('/updatePassword', authRequired, updatePassword)

export default router;