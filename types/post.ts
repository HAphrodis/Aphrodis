export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  updatedAt: string;
  featuredPhoto: {
    url: string;
  };
  content: {
    html?: string;
    text?: string;
    markdown?: string;
  };
  category: {
    name: string;
    slug: string;
  }[];
}