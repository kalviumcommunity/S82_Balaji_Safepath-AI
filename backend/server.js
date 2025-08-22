import express from 'express';
import cors from 'cors';
import { env } from './src/config/env.js';
import healthRouter from './src/routes/health.js';
import promptRouter from './src/routes/prompt.js';
import alertsRouter from './src/routes/alerts.js';
import functionAlertsRouter from './src/routes/functionalerts.js';
import { chainOfThoughtChecklist } from './src/controllers/chainofthoughts.js';
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/prompt", promptRouter);
app.use("/api/health", healthRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/function-alerts", functionAlertsRouter);
app.use("/api/chain-of-thought", chainOfThoughtChecklist);

// 404 handler
app.use((req, res) => res.status(404).json({ ok: false, error: 'Not Found' }));

// start
app.listen(env.PORT, () => {
  console.log(`✅ SafePath API running on http://localhost:${env.PORT}`);
});
