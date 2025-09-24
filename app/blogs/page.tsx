import AllBlogComponent from '@/components/blogs/allBlog';
import FeaturedBlogComponent from '@/components/blogs/featuredPost';
import React from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Banner from '@/components/common/banner';

function BlogPage() {
  return (
    <DefaultLayout>
      <Banner currentPage="Blogs & News" backgroundImage="/header.jpg" />
      <section className='hidden md:block'>
      <FeaturedBlogComponent />
      </section>
      <AllBlogComponent />
    </DefaultLayout>
  );
}

export default BlogPage;
