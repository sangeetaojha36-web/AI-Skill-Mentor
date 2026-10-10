import express from 'express';
import { apiRouter } from '../server/apiRouter.ts';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
