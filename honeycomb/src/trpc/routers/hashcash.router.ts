import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { generateHashcash, verifyHashcash } from '../../lib/hashcash';

export const hashcashRouter = router({
  generate: publicProcedure
    .input(z.object({
      resource: z.string(),
      bits: z.number().min(10).max(30).default(20),
    }))
    .mutation(({ input }) => {
      const stamp = generateHashcash(input.resource, input.bits);
      
      return {
        stamp,
        verified: verifyHashcash(stamp, input.bits),
        bits: input.bits,
        computedAt: new Date().toISOString(),
      };
    }),

  verify: publicProcedure
    .input(z.object({
      stamp: z.string(),
      requiredBits: z.number().min(10).max(30).default(20),
    }))
    .query(({ input }) => {
      return {
        verified: verifyHashcash(input.stamp, input.requiredBits),
        stamp: input.stamp,
      };
    }),
});
