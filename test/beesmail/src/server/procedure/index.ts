import { publicProcedure, router } from '../router/trpc';
import { z } from 'zod';

const appRouter = router({
  logInput: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(({ input }) => {
      console.log('Received input:', input);
      return { success: true, message: 'Data logged successfully' };
    }),
});

export type AppRouter = typeof appRouter;
export default appRouter;