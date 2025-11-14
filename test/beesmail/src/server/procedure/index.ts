import { router } from '../router/trpc';
import { registerRouter } from './register';

const appRouter = router({
  auth: registerRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;