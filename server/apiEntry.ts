import express from 'express';
import { apiRouter } from './apiRouter.ts';

const app = express();
app.use(express.json({ limit: '10mb' }));

// Health / root endpoint
app.get(['/', '/api', '/api/index', '/api/health'], (_req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Skill Mentor API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
