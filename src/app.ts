import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import { startBus } from './event-bus/event-bus';

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

RegisterRoutes(app);
startBus();
