import Router from 'express';

import { 
    registerClient,
    registerProducer, 
    getProfileById,
    login, 
    logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/registerClient', registerClient)
router.post('/registerProducer', registerProducer)
router.get('/getProfile/:id', getProfileById)
router.post('/login', login)
router.post('/logout',logout)

export default router;