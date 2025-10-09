import { router } from '../trpc';
import { authRouter } from './auth.router';
import { mailRouter } from './mail.router';
import { hashcashRouter } from './hashcash.router';

export const appRouter = router({
  auth: authRouter,
  mail: mailRouter,
  hashcash: hashcashRouter,
});

export type AppRouter = typeof appRouter;
