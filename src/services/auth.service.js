// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Servicios para autenticación (login)

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../config/database.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Servicio para login de usuario
export const loginUserService = async (email, contrasenia) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    throw new Error('Usuario o contraseña no válidos');
  }

  const user = rows[0];

  if (!user.contrasenia) {
    throw new Error('Usuario sin contraseña configurada');
  }

  const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);

  if (!isMatch) {
    throw new Error('Usuario o contraseña no válidos');
  }

  const payload = {
    id: user.id_usuario,
    email: user.email,
    rol: user.rol
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: user.id_usuario,
      email: user.email,
      rol: user.rol,
      nombres: user.nombres,
      apellido: user.apellido
    }
  };
};