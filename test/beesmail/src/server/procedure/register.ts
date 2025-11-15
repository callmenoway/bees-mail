// @ts-nocheck
import { publicProcedure, router } from '../router/trpc';
import { z } from 'zod';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
const bcrypt = require('bcryptjs');

export const registerRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, 'Username must be at least 3 characters')
          .max(30, 'Username cannot exceed 30 characters')
          .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
          .regex(/[0-9]/, 'Password must contain at least one number')
          .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
      })
    )
    .mutation(async ({ input }) => {
      const { username, password } = input;

      try {
        const existingUser = await db.user.findUnique({
          where: { username: username.toLowerCase() },
        });

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'This username is already taken',
          });
        }

        const email = `${username.toLowerCase()}:beesmail`;
        const existingEmail = await db.user.findUnique({
          where: { email },
        });

        if (existingEmail) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'This email is already in use',
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
          data: {
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            domain: 'beesmail',
            twoFactorEnabled: false,
            twoFactorSecret: null,
          },
        });

        return {
          success: true,
          message: 'Account created successfully',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred during registration',
        });
      }
    }),
});
