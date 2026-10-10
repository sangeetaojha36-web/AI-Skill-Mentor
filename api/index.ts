import express from 'express';
import { apiRouter } from '../server/apiRouter.ts';

const app = express();

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get(['/', '/api', '/api/index'], (_req, res) => {
  res.json({ status: 'ok', service: 'AI Skill Mentor API', timestamp: new Date().toISOString() });
});

// Route handlers for Vercel
app.use('/api/index', apiRouter);
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
