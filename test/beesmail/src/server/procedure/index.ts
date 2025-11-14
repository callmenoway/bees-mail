import { router } from '../router/trpc';
import { registerRouter } from './register';
import { loginRouter } from './login';
import { avatarRouter } from './update-avatar';

const appRouter = router({
  auth: router({
    ...registerRouter._def.procedures,
    ...loginRouter._def.procedures,
  }),
  user: avatarRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;