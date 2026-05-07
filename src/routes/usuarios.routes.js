// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Rutas para usuarios (registro, login, perfil)

import { Router } from 'express';
import { register, login, getProfile } from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/profile', verifyToken, getProfile);

export default router;