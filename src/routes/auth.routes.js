// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Rutas para autenticación (login)

import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);

export default router;