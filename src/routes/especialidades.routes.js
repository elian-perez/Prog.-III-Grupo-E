// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Rutas para especialidades (CRUD)

import express from 'express';
import {
  listarEspecialidades,
  crearEspecialidad,
  editarEspecialidad,
  eliminarEspecialidad
} from '../controllers/especialidades.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/roles.middleware.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles(2, 3), listarEspecialidades);

router.post('/', verifyToken, authorizeRoles(3), crearEspecialidad);

router.put('/:id', verifyToken, authorizeRoles(3), editarEspecialidad);

router.delete('/:id', verifyToken, authorizeRoles(3), eliminarEspecialidad);

export default router;