// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Controladores para usuarios (registro, login, perfil)
 
import {
  registerUserService,
  loginUserService,
  getUserProfileService
} from '../services/usuarios.services.js';

// Registro de nuevo usuario
export const register = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const result = await registerUserService(email, contrasenia);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Login de usuario existente
export const login = async (req, res) => {
  const { email, contrasenia } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const result = await loginUserService(email, contrasenia);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

// Perfil del usuario autenticado
export const getProfile = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const user = await getUserProfileService(userId);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};