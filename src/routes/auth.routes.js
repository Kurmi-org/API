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

/**
 * @swagger
 * /api/registerClient:
 *   post:
 *     summary: Registra un nuevo cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterClient'
 *     responses:
 *       "200":
 *         description: El cliente se ha registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "400":
 *         description: La solicitud es inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//el registerClient esta abierto para todos los usuarios
router.post('/registerClient', validatorSchema(registerClientSchema), registerClient)
/**
 * @swagger
 * /api/registerProducer:
 *   post:
 *     summary: Registra un nuevo productor
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterProducer'
 *     responses:
 *       "200":
 *         description: El productor se ha registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "400":
 *         description: La solicitud es inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//el registerProducer solo se puede hacer si el admin esta logueado
router.post('/registerProducer', authRequired, registerProducer)
/**
 * @swagger
 * /api/getProfile:
 *   get:
 *     summary: Obtiene el perfil del usuario actual
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: El perfil del usuario se ha obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//el getProfile solo se puede hacer si el usuario esta logueado
router.get('/getProfile', authRequired, getProfile)
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicia sesión en la aplicación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       "200":
 *         description: El usuario se ha autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


//el login esta abierto para todos los usuarios
router.post('/login', validatorSchema(loginSchema), login)
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Cierra sesión en la aplicación
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: El usuario se ha desconectado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       "401":
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//el logout solo se puede hacer si el usuario esta logueado
router.post('/logout', logout)
/**
 * @swagger
 * /api/updatePassword:
 *   put:
 *     summary: Actualiza la contraseña del usuario actual
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       "200":
 *         description: La contraseña se ha actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       "401":
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "400":
 *         description: La solicitud es inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//el updatePassword solo se puede hacer si el usuario esta logueado
router.put('/updatePassword', updatePassword)

export default router;