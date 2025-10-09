import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { router, publicProcedure } from '../trpc';
import { registerSchema, loginSchema } from '../../schemas/auth.schema';
import { prisma } from '../../lib/prisma';
import { generateToken } from '../../lib/jwt';

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const address = `${input.username}~${input.domain}`;
      
      const existing = await prisma.user.findUnique({ where: { address } });
      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Address already exists',
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);

      const user = await prisma.user.create({
        data: {
          address,
          username: input.username,
          domain: input.domain,
          passwordHash,
        },
        select: {
          id: true,
          address: true,
          username: true,
          domain: true,
          storageUsed: true,
          storageLimit: true,
          createdAt: true,
          isActive: true,
        },
      });

      const token = generateToken(user.address);

      return { token, user };
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { address: input.address },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const token = generateToken(user.address);

      return {
        token,
        user: {
          id: user.id,
          address: user.address,
          username: user.username,
          domain: user.domain,
          storageUsed: user.storageUsed,
          storageLimit: user.storageLimit,
          createdAt: user.createdAt,
          isActive: user.isActive,
        },
      };
    }),
});
