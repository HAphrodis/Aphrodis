// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/services/blogService';
// import { Post } from '@/types/post';
// import { getFeaturedPosts } from '@/services/blogService';

export async function GET() {
  try {
    // const featuredBlog = await getFeaturedPosts();

    // You can pass options here, like orderBy, first, skip
    const posts = await getBlogPosts(); // You can pass options here, like orderBy, first, skip
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
