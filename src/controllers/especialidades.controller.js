// UNER - TUDW - Programación 3 - 2026
// Controladores para especialidades (CRUD)

import {
  listarEspecialidadesService,
  crearEspecialidadService,
  editarEspecialidadService,
  eliminarEspecialidadService
} from '../services/especialidades.service.js';

// Listar todas las especialidades
export const listarEspecialidades = async (req, res) => {
  try {
    const data = await listarEspecialidadesService();
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva especialidad
export const crearEspecialidad = async (req, res) => {
  try {
    const result = await crearEspecialidadService(req.body);
    res.status(201).json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modificar especialidad existente
export const editarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await editarEspecialidadService(id, req.body);

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar especialidad (soft delete)
export const eliminarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await eliminarEspecialidadService(id);

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};