import { router } from '../router/trpc';
import { registerRouter } from './register';
import { loginRouter } from './login';

const appRouter = router({
  auth: router({
    ...registerRouter._def.procedures,
    ...loginRouter._def.procedures,
  }),
});

export type AppRouter = typeof appRouter;
export default appRouter;