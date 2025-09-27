import AllBlogComponent from '@/components/blogs/allBlog';
import FeaturedBlogComponent from '@/components/blogs/featuredPost';
import React from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import PageHeader from '@/components/shared/page-header';

function BlogPage() {
  return (
    <DefaultLayout>
  <PageHeader
  title="Blog"
  highlightedTitle="Posts"
  subtitle="Read my latest thoughts, ideas, and experiences on web development, design, and technology."
/>

      <section className=''>
      <FeaturedBlogComponent />
      </section>
      <AllBlogComponent />
    </DefaultLayout>
  );
}

export default BlogPage;
