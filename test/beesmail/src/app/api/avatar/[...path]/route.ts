import { NextRequest, NextResponse } from 'next/server';
import { minioClient, BUCKETS } from '@/lib/minio';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const fileName = path.join('/');
    
    console.log('[Avatar API] Fetching file:', fileName);
    
    const stream = await minioClient.getObject(BUCKETS.AVATARS, fileName);
    
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    console.log('[Avatar API] File loaded, size:', buffer.length);
    
    const contentType = fileName.endsWith('.png') ? 'image/png' :
                       fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' :
                       fileName.endsWith('.webp') ? 'image/webp' :
                       'image/jpeg';
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[Avatar API] Error fetching avatar:', error);
    return new NextResponse('Avatar not found', { status: 404 });
  }
}