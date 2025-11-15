import { router } from '../router/trpc';
import { registerRouter } from './register';
import { loginRouter } from './login';
import { avatarRouter } from './update-avatar';
import { twoFactorRouter } from './two-factor';

const appRouter = router({
  auth: router({
    ...registerRouter._def.procedures,
    ...loginRouter._def.procedures,
  }),
  user: avatarRouter,
  twoFactor: router({
    ...twoFactorRouter._def.procedures,
  }),
});

export type AppRouter = typeof appRouter;
export default appRouter;