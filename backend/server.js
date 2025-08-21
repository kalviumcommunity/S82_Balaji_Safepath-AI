import express from 'express';
import cors from 'cors';
import { env } from './src/config/env.js';
import healthRouter from './src/routes/health.js';
import promptRouter from './src/routes/prompt.js';
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/prompt", promptRouter);
app.use('/api/health', healthRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ ok: false, error: 'Not Found' }));

// start
app.listen(env.PORT, () => {
  console.log(`✅ SafePath API running on http://localhost:${env.PORT}`);
});
