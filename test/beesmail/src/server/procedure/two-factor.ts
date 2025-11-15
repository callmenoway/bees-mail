import { z } from 'zod';
import { router, publicProcedure } from '../router/trpc';
import { db } from '@/lib/db';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export const twoFactorRouter = router({
  generateSecret: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(user.email, 'BeesMail', secret);
        const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

        await db.user.update({
          where: { id: userId },
          data: { twoFactorSecret: secret },
        });

        return {
          success: true,
          secret,
          qrCode: qrCodeDataUrl,
        };
      } catch (error) {
        throw new Error('Failed to generate 2FA secret');
      }
    }),

  verifyAndEnable: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        token: z.string().length(6),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, token } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
        });

        if (!user || !user.twoFactorSecret) {
          throw new Error('User not found or 2FA not initialized');
        }

        const isValid = authenticator.verify({
          token,
          secret: user.twoFactorSecret,
        });

        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        await db.user.update({
          where: { id: userId },
          data: { twoFactorEnabled: true },
        });

        return {
          success: true,
          message: '2FA enabled successfully',
        };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to verify code');
      }
    }),

  disable: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        token: z.string().length(6),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, token } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
        });

        if (!user || !user.twoFactorSecret) {
          throw new Error('User not found or 2FA not enabled');
        }

        const isValid = authenticator.verify({
          token,
          secret: user.twoFactorSecret,
        });

        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        await db.user.update({
          where: { id: userId },
          data: { 
            twoFactorEnabled: false,
            twoFactorSecret: null,
          },
        });

        return {
          success: true,
          message: '2FA disabled successfully',
        };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to disable 2FA');
      }
    }),

  getStatus: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            twoFactorEnabled: true,
          },
        });

        if (!user) {
          return { enabled: false };
        }

        return {
          enabled: user.twoFactorEnabled || false,
        };
      } catch (error) {
        return { enabled: false };
      }
    }),

  checkLoginStatus: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { email } = input;

      try {
        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            twoFactorEnabled: true,
          },
        });

        if (!user) {
          return { enabled: false, userId: null };
        }

        return {
          enabled: user.twoFactorEnabled || false,
          userId: user.id,
        };
      } catch (error) {
        return { enabled: false, userId: null };
      }
    }),

  verifyLoginToken: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        token: z.string().length(6),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, token } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
        });

        if (!user || !user.twoFactorSecret) {
          throw new Error('User not found or 2FA not enabled');
        }

        const isValid = authenticator.verify({
          token,
          secret: user.twoFactorSecret,
        });

        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        return {
          success: true,
          message: '2FA verification successful',
        };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to verify code');
      }
    }),
});
