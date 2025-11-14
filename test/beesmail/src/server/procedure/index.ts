import { publicProcedure, router } from '../router/trpc';
import { registerRouter } from './register';

const appRouter = router({
  register: registerRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;