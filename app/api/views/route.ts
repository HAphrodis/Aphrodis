import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { generateIPHash } from '@/utils/generateIpHash';
import redisClient from '@/utils/redis';

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const headersList = headers();
    const ip = (await headersList).get('x-forwarded-for') ?? 'unknown';
    const ipHash = await generateIPHash(ip);

    // Check if user has already liked this post
    const hasLikedKey = `likes:${slug}:ip:${ipHash}`;
    const hasLiked = await redisClient.get(hasLikedKey);

    if (hasLiked) {
      const likesKey = `likes:${slug}`;
      const currentLikes = await redisClient.get(likesKey);
      return NextResponse.json(
        {
          error: 'Already liked',
          count: Number.parseInt(currentLikes || '0', 10),
          hasLiked: true
        },
        { status: 409 }
      );
    }

    const likesKey = `likes:${slug}`;

    // Use multi to ensure atomicity
    const multi = redisClient.multi();
    multi.incr(likesKey);
    // Store the IP hash permanently
    multi.set(hasLikedKey, '1');

    const results = await multi.exec();

    if (!results) {
      throw new Error('Failed to execute Redis commands');
    }

    const count = results[0][1] as number;

    return NextResponse.json({ count, hasLiked: true });
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const headersList = headers();
    const ip = (await headersList).get('x-forwarded-for') ?? 'unknown';
    const ipHash = await generateIPHash(ip);

    const [likesCount, hasLiked] = await Promise.all([
      redisClient.get(`likes:${slug}`),
      redisClient.get(`likes:${slug}:ip:${ipHash}`)
    ]);

    return NextResponse.json({
      count: Number.parseInt(likesCount || '0', 10),
      hasLiked: Boolean(hasLiked)
    });
  } catch (error) {
    console.error('Error getting likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
