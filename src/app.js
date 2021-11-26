import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/userRoutes';

import { createRoles, createAdmin } from "./libs/initialSetup";

const app = express();
createRoles();
createAdmin();

// Crear nueva variable en app
app.set('pkg', pkg);

// Indicar el puerto de escucha
app.set('port', process.env.PORT || 3000);
// Desarrollar en dev
app.use(morgan('dev'));

// Para que nuestra aplicción entienda los objetos json
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", usersRoutes);

export default app;