import express from 'express';
import morgan from 'morgan';
import { employeeRouter } from './routes/employeeRoutes.js';

const app = express();

// * Setting up middlewares.

// TODO: Setting up dev middlewares.
app.use(morgan('dev'));

// TODO: Setting up body parser middlewares.
app.use(express.json());

// TODO: Setting up routing middlewares.
app.use('/api/v1/hospitalManagement/employee', employeeRouter);

export default app;
