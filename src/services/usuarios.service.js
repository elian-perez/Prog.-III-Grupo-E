import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

const SALT_ROUNDS = 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Registro de nuevo usuario
export const registerUserService = async (email, contrasenia) => {
  const [existing] = await db.query(
    'SELECT id_usuario FROM usuarios WHERE email = ?',
    [email]
  );

  if (existing.length > 0) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);

  await db.query(
    'INSERT INTO usuarios (email, contrasenia) VALUES (?, ?)',
    [email, hashedPassword]
  );

  return { message: 'Usuario registrado correctamente' };
};

// Login de usuario existente
export const loginUserService = async (email, contrasenia) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    throw new Error('Usuario o contraseña no válidos');
  }

  const user = rows[0];

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
      rol: user.rol
    }
  };
};

// Perfil del usuario autenticado
export const getUserProfileService = async (userId) => {
  const [rows] = await db.query(
    'SELECT id_usuario, email, rol FROM usuarios WHERE id_usuario = ?',
    [userId]
  );

  if (rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  return rows[0];
};