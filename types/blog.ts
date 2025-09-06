export interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  image: string;
  author: string;
  body: string;
  tags: string[];
  readingTime?: number;
}
