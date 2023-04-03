import express from 'express';
import { App } from './src/app.js';
import { routes } from './src/routes/index.js';

const app = new App(express);
app.listen(4444);
app.useRoutes(routes);
