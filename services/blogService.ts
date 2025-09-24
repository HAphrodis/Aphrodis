// services\blogService.ts
import { gql } from 'graphql-request';
import { hygraph } from '@/lib/hygraph';

// -------- ** GET RELATED POSTS ** -------- //
const GET_RELATED_POSTS_QUERY = gql`
  query GetRelatedPosts($slug: String!, $categorySlug: String!) {
    posts(
      where: { category_every: { slug: $categorySlug }, slug_not: $slug }
      orderBy: createdAt_DESC
      first: 3
    ) {
      id
      title
      slug
      excerpt
      featuredPhoto {
        url
      }
      content{
        markdown
      }
      category {
        name
        slug
      }
      createdAt
    }
  }
`;

export async function getRelatedPosts(slug: string, categorySlug: string) {
  const { posts } = await hygraph.request<{ posts: any[] }>(GET_RELATED_POSTS_QUERY, {
    slug,
    categorySlug,
  });
  return posts;
}

// -------- ** GET ALL BLOGS ** -------- //
const GET_ALL_BLOGS_QUERY = gql`
  query GetAllBlogs {
    posts(orderBy: createdAt_DESC) {
      id
      title
      slug
      createdAt
      excerpt
      featuredPhoto {
        url
      }
      content {
        markdown
      }
      category {
        name
        slug
      }
      updatedAt
    }
  }
`;

export async function getAllBlogs() {
  const { posts } = await hygraph.request<{ posts: any[] }>(
    GET_ALL_BLOGS_QUERY
  );
  return posts;
}

// ==== Featured Posts ==== //
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost {
      posts(where: { isFeatured: true }, orderBy: createdAt_DESC) {
        id
        title
        slug
        createdAt
        excerpt
        featuredPhoto {
          url
        }
        content {
          markdown
        }
        category {
          name
          slug
        }
        updatedAt
      }
    }
  `;

    try {
    const result = await hygraph.request<{ posts: any[] }>(query);
    return result.posts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// ==== GET ALL BLOGS ==== //
const GET_BLOG_POSTS_QUERY = gql`
  query BlogPostsQuery($orderBy: PostOrderByInput, $first: Int, $skip: Int) {
    posts(orderBy: $orderBy, first: $first, skip: $skip) {
      id
      title
      slug
      createdAt
      excerpt
      isFeatured
      featuredPhoto {
        url
      }
      category {
        name
        slug
      }
      content {
        markdown
      }
      updatedAt
    }
    totalPostsCount: postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export async function getBlogPosts(
  orderBy: string = 'createdAt_DESC',
  first: number = 9,
  skip: number = 0
) {
  const { posts, totalPostsCount } = await hygraph.request<{
    posts: any[];
    totalPostsCount: { aggregate: { count: number } };
  }>(GET_BLOG_POSTS_QUERY, { orderBy, first, skip });
  return { posts, totalPostsCount: totalPostsCount.aggregate.count };
}

// -------- ** GET POST BY SLUG ** -------- //
const GET_POST_BY_SLUG_QUERY = gql`
  query GetPostBySlug($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      excerpt
      featuredPhoto {
        url
      }
      content {
        markdown
      }
      slug
      createdAt
      category {
        name
        slug
      }
     author {
      name
      bio
      email
      id
      profilePhoto{
        url
        width
        height
      }
      linkedInUrl
      instagramHandle
      twitterXHandle
      portfolio
    }
      updatedAt
    }
  }
`;

export async function getPostBySlug(slug: string) {
  const { post } = await hygraph.request<{ post: any }>(
    GET_POST_BY_SLUG_QUERY,
    { slug }
  );
  return post;
}

// -------- ** GET POST BY CATEGORY ** -------- //
const GET_POSTS_BY_CATEGORY_QUERY = gql`
  query GetPostsByCategory($slug: String!) {
    posts(where: { category: { slug: $slug } }, orderBy: createdAt_DESC) {
      id
      title
      slug
      createdAt
      excerpt
      featuredPhoto {
        url
      }
      content {
        markdown
      }
      category {
        name
        slug
      }
      updatedAt
    }
  }
`;

export async function getPostsByCategory(slug: string) {
  const { posts } = await hygraph.request<{ posts: any[] }>(
    GET_POSTS_BY_CATEGORY_QUERY,
    { slug }
  );
  return posts;
}

// -------- ** GET ALL CATEGORIES ** -------- //
const GET_ALL_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    categories {
      name
      slug
    }
  }
`;

export async function getAllCategories() {
  const { categories } = await hygraph.request<{ categories: any[] }>(
    GET_ALL_CATEGORIES_QUERY
  );
  return categories;
}
