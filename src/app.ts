import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/router';

dotenv.config();

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
