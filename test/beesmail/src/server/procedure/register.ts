import { publicProcedure, router } from '../router/trpc';
import { z } from 'zod';

export const registerRouter = router({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ input }) => {
      console.log('Register attempt:', input.email);
      return { success: true, token: 'abc123' };
    }),
});