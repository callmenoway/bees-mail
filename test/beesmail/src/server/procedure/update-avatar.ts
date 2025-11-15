import { z } from 'zod';
import { router, publicProcedure } from '../router/trpc';
import { db } from '@/lib/db';
import { uploadAvatar, BUCKETS, minioClient } from '@/lib/minio';

export const avatarRouter = router({
  updateAvatar: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, image } = input;

      try {
        const user = await db.user.findUnique({
          where: { id: userId },
          select: { image: true },
        });

        if (user?.image && user.image.startsWith('/api/avatar/')) {
          const fileName = user.image.replace('/api/avatar/', '');
          await minioClient.removeObject(BUCKETS.AVATARS, fileName);
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const contentType = image.match(/data:(image\/\w+);base64/)?.[1] || 'image/jpeg';

        const minioUrl = await uploadAvatar(userId, buffer, contentType);

        console.log('[Avatar Upload] MinIO URL:', minioUrl);

        const updatedUser = await db.user.update({
          where: { id: userId },
          data: { image: minioUrl },
        });

        console.log('[Avatar Upload] Updated user image in DB:', updatedUser.image);

        return {
          success: true,
          message: 'Avatar updated successfully',
          image: updatedUser.image,
        };
      } catch (error) {
        throw new Error('Failed to update avatar');
      }
    }),
});
