import Router from 'express';
import { authRequired } from "../middlewares/validateToken.js";
import { updateClient } from '../controllers/client.controller.js';


const router = Router();


//el updateClient solo se puede hacer si el usuario esta logueado
//y el usuario logueado es un cliente
/**
 * @swagger
 * /api/updateClient:
 *   put:
 *     summary: Actualiza los datos del cliente actual
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClient'
 *     responses:
 *       "200":
 *         description: Los datos del cliente se han actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
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
router.put('/updateClient',   authRequired, updateClient)

export default router;