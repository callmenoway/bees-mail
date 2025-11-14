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
          .min(3, 'Lo username deve essere almeno 3 caratteri')
          .max(30, 'Lo username non può superare 30 caratteri')
          .regex(/^[a-zA-Z0-9]+$/, 'Lo username può contenere solo lettere e numeri'),
        password: z
          .string()
          .min(8, 'La password deve essere almeno 8 caratteri')
          .regex(/[A-Z]/, 'La password deve contenere almeno una lettera maiuscola')
          .regex(/[a-z]/, 'La password deve contenere almeno una lettera minuscola')
          .regex(/[0-9]/, 'La password deve contenere almeno un numero')
          .regex(/[^A-Za-z0-9]/, 'La password deve contenere almeno un carattere speciale'),
      })
    )
    .mutation(async ({ input }) => {
      const { username, password } = input;

      try {
        // Verifica se lo username esiste già
        const existingUser = await db.user.findUnique({
          where: { username: username.toLowerCase() },
        });

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Questo username è già in uso',
          });
        }

        // Verifica se l'email completa esiste già
        const email = `${username.toLowerCase()}:beesmail`;
        const existingEmail = await db.user.findUnique({
          where: { email },
        });

        if (existingEmail) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Questa email è già in uso',
          });
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea l'utente
        const user = await db.user.create({
          data: {
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            domain: 'beesmail',
          },
        });

        return {
          success: true,
          message: 'Account creato con successo',
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
          message: 'Si è verificato un errore durante la registrazione',
        });
      }
    }),
});
