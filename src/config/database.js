// UNER - TUDW - Programación 3 - 2026 - Grupo E
// src/config/database.js

import 'dotenv/config';
import mysql from 'mysql2/promise';

// Configuración de conexión usando variables de entorno
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Función opcional para testear conexión
export const connectDB = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Ya estás conectado a MySQL');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a MySQL:', error.message);
  }
};

export { db };