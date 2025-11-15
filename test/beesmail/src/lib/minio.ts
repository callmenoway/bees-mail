import * as Minio from 'minio';

export const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin123',
});

export const BUCKETS = {
  AVATARS: 'avatars',
  MAIL_ATTACHMENTS: 'mail-attachments',
};

export async function ensureBucketExists(bucketName: string, isPublic: boolean = false) {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      
      if (isPublic) {
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${bucketName}/*`],
            },
          ],
        };
        await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName} exists:`, error);
    return false;
  }
}

export async function uploadAvatar(userId: string, buffer: Buffer, contentType: string): Promise<string> {
  const bucketName = BUCKETS.AVATARS;
  await ensureBucketExists(bucketName, true);
  
  const extension = contentType.split('/')[1] || 'jpg';
  const fileName = `${userId}-${Date.now()}.${extension}`;
  
  await minioClient.putObject(bucketName, fileName, buffer, buffer.length, {
    'Content-Type': contentType,
  });
  
  return `/api/avatar/${fileName}`;
}

export async function deleteAvatar(url: string): Promise<boolean> {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    const bucketName = pathParts[0];
    const objectName = pathParts.slice(1).join('/');
    
    await minioClient.removeObject(bucketName, objectName);
    return true;
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return false;
  }
}
