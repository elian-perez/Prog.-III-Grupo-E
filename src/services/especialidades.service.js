// UNER - TUDW - Programación 3 - 2026 - Grupo E
// Servicios para especialidades (CRUD)

import { db } from '../config/database.js';

// Listar todas las especialidades activas
export const listarEspecialidadesService = async () => {
  const [rows] = await db.query(
    `SELECT * FROM especialidades WHERE activo = 1`
  );

  return rows;
};

// Crear nueva especialidad
export const crearEspecialidadService = async (data) => {
  const { nombre } = data;

  if (!nombre) {
    throw new Error('Nombre requerido');
  }

  const [result] = await db.query(
    `INSERT INTO especialidades (nombre, activo)
     VALUES (?, 1)`,
    [nombre]
  );

  return {
    message: 'Especialidad creada correctamente',
    id: result.insertId  // 👈 ESTO MATCHEA id_especialidad
  };
};

// Modificar especialidad existente
export const editarEspecialidadService = async (id, data) => {
  const { nombre } = data;

  const [rows] = await db.query(
    `SELECT id_especialidad FROM especialidades
     WHERE id_especialidad = ? AND activo = 1`,
    [id]
  );

  if (!rows.length) {
    throw new Error('Especialidad no encontrada');
  }

  await db.query(
    `UPDATE especialidades
     SET nombre = ?
     WHERE id_especialidad = ?`,
    [nombre, id]
  );

  return { message: 'Especialidad actualizada correctamente' };
};

// Eliminar especialidad (soft delete)
export const eliminarEspecialidadService = async (id) => {
  const [rows] = await db.query(
    `SELECT id_especialidad FROM especialidades
     WHERE id_especialidad = ? AND activo = 1`,
    [id]
  );

  if (!rows.length) {
    throw new Error('Especialidad no encontrada');
  }

  await db.query(
    `UPDATE especialidades
     SET activo = 0
     WHERE id_especialidad = ?`,
    [id]
  );

  return { message: 'Especialidad eliminada correctamente' };
};