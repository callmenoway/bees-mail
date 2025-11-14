// @ts-nocheck
import { publicProcedure, router } from '../router/trpc';
import { z } from 'zod';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
const bcrypt = require('bcryptjs');

export const loginRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z
          .string()
          .min(1, 'Email is required')
          .regex(
            /^[a-zA-Z0-9._-]+:[a-zA-Z0-9]+$/,
            'Invalid email format. Use username:domain format'
          )
          .transform((val) => val.toLowerCase()), // Sanitizzazione: converte in lowercase
        password: z.string().min(1, 'Password is required'),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        // Estrai username e dominio dall'email
        const [username, domain] = email.split(':');

        // Sanitizzazione aggiuntiva
        const sanitizedUsername = username.trim();
        const sanitizedDomain = domain.trim();

        // Validazione del formato username
        if (!/^[a-zA-Z0-9._-]+$/.test(sanitizedUsername)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid username',
          });
        }

        // Validazione del formato dominio
        if (!/^[a-zA-Z0-9]+$/.test(sanitizedDomain)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid domain',
          });
        }

        // Ricostruisci l'email sanitizzata
        const sanitizedEmail = `${sanitizedUsername}:${sanitizedDomain}`;

        // Cerca l'utente per email completa (supporta sia :beesmail che domini custom)
        const user = await db.user.findUnique({
          where: { email: sanitizedEmail },
        });

        if (!user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid credentials',
          });
        }

        // Verifica la password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid credentials',
          });
        }

        // Login riuscito
        return {
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            domain: user.domain,
            isPremium: user.isPremium,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred during login',
        });
      }
    }),
});
