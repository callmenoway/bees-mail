import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/routers';
import { createContext } from './trpc/context';
import authRoutes from './routes/auth.routes';
import mailRoutes from './routes/mail.routes';
import hashcashRoutes from './routes/hashcash.routes';

dotenv.config();

// Fix BigInt serialization
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// REST API endpoints (per testare facilmente)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/mail', mailRoutes);
app.use('/api/v1/hashcash', hashcashRoutes);

// tRPC endpoint (per frontend React)
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    protocol: 'honeycomb',
    version: '1.0.0',
    endpoints: {
      rest: '/api/v1',
      trpc: '/trpc',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🐝 Honeycomb Protocol Server running on port ${PORT}`);
  console.log(`📡 REST API: http://localhost:${PORT}/api/v1`);
  console.log(`📡 tRPC: http://localhost:${PORT}/trpc`);
});
