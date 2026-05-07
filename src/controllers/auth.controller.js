// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Controladores para autenticación (login)

import { loginUserService } from '../services/auth.service.js';

export const login = async (req, res) => {
  const { email, contrasenia } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const result = await loginUserService(email, contrasenia);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};