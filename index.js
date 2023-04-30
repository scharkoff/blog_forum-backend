import express from 'express';
import App from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const app = new App(express);
app.listen(4444);
