// components/blogs/AllBlogComponent.tsx
'use client';
import { calculateReadingTime } from '@/utils/readingTime';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getBlogPosts } from '@/services/blogService';
import { Post } from '@/types/post';
import BlogCardSkeleton from './BlogCardSkeleton';
import Link from 'next/link';
import { ArrowUpRight, Newspaper, Search, X } from 'lucide-react';
import { formatDate } from '@/utils/formatTime';
import { ImprovedPagination } from '../ui/improved-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

const ALL_POSTS_PER_PAGE = 9;

export default function AllBlogComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPostsCurrentPage, setAllPostsCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setAllPostsTotalPages] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const skip = page * ALL_POSTS_PER_PAGE;
      const { posts: fetchedPosts, totalPostsCount } = await getBlogPosts(
        'updatedAt_DESC',
        ALL_POSTS_PER_PAGE,
        skip
      );

      setPosts(fetchedPosts);
      setAllPostsTotalPages(Math.ceil(totalPostsCount / ALL_POSTS_PER_PAGE));
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(allPostsCurrentPage);
  }, [allPostsCurrentPage]);

  // Reset to first page when search changes
  useEffect(() => {
    setAllPostsCurrentPage(0);
  }, [searchQuery, selectedCategory]);

  const handlePageChange = (page: number) => {
    setAllPostsCurrentPage(page - 1);
  };

  // Apply filters
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory
      ? post.category.some((cat) => cat.slug === selectedCategory)
      : true;

    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Paginate filtered results
  const start = allPostsCurrentPage * ALL_POSTS_PER_PAGE;
  const currentAllPosts = filteredPosts.slice(start, start + ALL_POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-5 font-sans">
      {/* Search and Filter Bar */}
      <motion.div
        className="mb-2 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full md:w-auto">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search articles..."
            className="w-full rounded-full border-[#0e1f1d] py-2 pr-4 pl-10 focus:border-purple-300/20 focus:ring focus:ring-purple-300/10 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* <h2 className="text-2xl md:text-3xl font-bold text-green">Blogs & News</h2> */}
          <div className="flex gap-2">
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              List View
            </Button>
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('grid')}
            >
              Grid View
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Blog Cards */}
      <div
        className={
          view === 'grid'
            ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-8'
        }
      >
        {loading ? (
          Array.from({ length: ALL_POSTS_PER_PAGE }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : error ? (
          <motion.div
              className="relative rounded-lg border border-red-400 bg-red-100 px-6 py-8 text-center text-red-700"
              role="alert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-2 text-xl font-bold">Error Loading Articles</h3>
              <p className="mb-4">{error}</p>
              <button
                onClick={() => fetchPosts(allPostsCurrentPage)}
                className="rounded-full bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Try Again
              </button>
            </motion.div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
              className="flex flex-col items-center justify-center px-4 py-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Newspaper className="mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-bold text-[#0e1f1d]">
                No articles found
              </h3>
              <p className="mb-6 max-w-md text-gray-600">
                {searchQuery
                  ? `No articles matching "${searchQuery}"`
                  : 'No articles in this category yet. Check back soon for updates!'}
              </p>
              <button
                className="rounded-full bg-[#0e1f1d] px-6 py-2 text-white transition-colors hover:bg-[#00753c]"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                View All Articles
              </button>
            </motion.div>
        ) : (
          currentAllPosts.map((post) => (
            <Link
              key={post.slug}
              href={`blogs/post/${post.slug}`}
              className="group block"
            >
              <div
                className={`relative rounded-2xl overflow-hidden border border-gray-700 bg-[#0e1f1d] hover:bg-[#112624] transition ${
                  view === 'list' ? 'flex flex-row items-center' : ''
                }`}
              >
                {/* IMAGE */}
                <div className={view === 'list' ? 'w-1/3' : ''}>
                  <Image
                    src={post.featuredPhoto.url}
                    alt={post.title}
                    width={600}
                    height={400}
                    className={`object-cover w-full h-52 md:h-60 transition-transform duration-500 group-hover:scale-105 ${
                      view === 'list' ? 'rounded-l-2xl' : ''
                    }`}
                  />

                     {/* Category badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap">
                          {post.category.map((cat, catIndex) => (
                            <span
                              key={catIndex}
                              className="mr-2 mb-2 inline-block rounded-full bg-[#0e1f1d] px-3 py-1 text-xs text-white"
                            >
                              {cat.name.length > 20
                                ? `${cat.name.slice(0, 20)}...`
                                : cat.name}
                            </span>
                          ))}
                        </div>
                </div>

                {/* CONTENT */}
                <div className={`p-6 ${view === 'list' ? 'w-2/3' : ''}`}>
                  <p className="text-sm text-green-400 mb-2">
                    {formatDate(post.updatedAt)}
                  </p>
                  <h3 className="text-xl line-clamp-1 font-bold text-white group-hover:text-green-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mt-2 line-clamp-3">{post.excerpt}</p>

                  {/* Tags */}
                  {/* <div className="flex flex-wrap gap-2 mt-4">
                    {post.category?.slice(0, 5).map((cat) => (
                      <span
                        key={cat.slug}
                        className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div> */}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>
                      {calculateReadingTime(post.content.markdown || '')} read
                    </span>
                    <ArrowUpRight className="text-gray-400 group-hover:text-green-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="mt-12">
          <ImprovedPagination
            currentPage={allPostsCurrentPage + 1}
            totalPages={Math.ceil(filteredPosts.length / ALL_POSTS_PER_PAGE)}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
