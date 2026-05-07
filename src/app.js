import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import especialidadesRoutes from './routes/especialidades.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/especialidades', especialidadesRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;