import { z } from 'zod';
import { router, publicProcedure } from '../router/trpc';
import { db } from '@/lib/db';

export const avatarRouter = router({
  updateAvatar: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        avatarBase64: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, avatarBase64 } = input;

      try {
        // Update user avatar
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: { image: avatarBase64 },
        });

        return {
          success: true,
          message: 'Avatar updated successfully',
          image: updatedUser.image,
        };
      } catch (error) {
        console.error('Avatar update error:', error);
        throw new Error('Failed to update avatar');
      }
    }),
});
