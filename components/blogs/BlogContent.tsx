// components/blogs/BlogContent.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import TableOfContents from '@/components/blogs/TableOfContents';
import { calculateReadingTime } from '@/utils/readingTime';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { BlogFooterCard } from './BlogFooterCard';
import { useConfetti } from '@/hooks/use-confetti';
import { Award } from 'lucide-react';
import { LikeButton } from './like-button';
import ViewCounter from './viewCounter';
import Banner from '../common/banner';

interface BlogContentProps {
  title: string;
  createdAt: string;
  content: string;
  featuredPhoto: string;
  slug: string;
  author: {
    name: string
    bio: string
    email: string
    id: string
    profilePhoto: {
      url: string
      width: number
      height: number
    }
    linkedInUrl?: string
    twitterXHandle?: string
    portfolio?: string
    instagramHandle?: string
  }
  tags: string[]
  relatedPosts: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    createdAt: string;
    featuredImage: string;
    tags: string[];
  }[];
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogContent({
  title,
  createdAt,
  content,
  featuredPhoto,
  slug,
  author,
  tags
}: BlogContentProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [readingTime, setReadingTime] = useState<string>('');
  const [, setImageModalSrc] = useState<string | null>(null);

  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const endOfArticleRef = useRef<HTMLDivElement>(null);
  const isEndOfArticleInView = useInView(endOfArticleRef, { once: true });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    if (isEndOfArticleInView) {
      triggerConfetti();
    }
  }, [isEndOfArticleInView, triggerConfetti]);

  useEffect(() => {
    const elements = document.querySelectorAll('h1, h2, h3');
    const headingElements: Heading[] = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number.parseInt(element.tagName.replace('H', ''))
    }));
    setHeadings(headingElements);

    setReadingTime(calculateReadingTime(content));

    const articleImages = document.querySelectorAll('.prose img');
    articleImages.forEach((img) => {
      img.classList.add(
        'cursor-zoom-in',
        'transition-transform',
        'hover:scale-[1.01]'
      );
      img.addEventListener('click', (e) => {
        const target = e.target as HTMLImageElement;
        setImageModalSrc(target.src);
      });
    });

    return () => {
      articleImages.forEach((img) => {
        img.removeEventListener('click', () => {});
      });
    };
  }, [content]);

  return (
    <>
      {/* Apply sans-serif to the entire page */}
      <div className="min-h-screen bg-gradient-to-b from-white to-[#cafff7]/20 text-black font-sans">
        {/* Reading Progress Bar */}
        <motion.div
          className="bg-secondary dark:bg-secondary fixed top-[3.5rem] right-0 left-0 z-50 h-[.25rem] md:hidden dark:text-black"
          style={{ scaleX }}
        />

        {/* Hero Section */}
        <div
          ref={heroRef}
          className="relative h-[50vh] overflow-hidden md:h-[70vh]"
        >
          <Banner currentPage={title} backgroundImage={featuredPhoto} />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="flex h-12 w-8 justify-center rounded-full border-2 border-white/50 p-2">
            <motion.div
              className="h-2 w-1 rounded-full bg-white"
              animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Table of Contents Sidebar */}
            <motion.aside
              className="order-2 shrink-0 lg:order-1 lg:w-80"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-20 hidden md:block">
                <TableOfContents headings={headings} />
              </div>
            </motion.aside>

            {/* Main Article Content */}
            <motion.article
              ref={articleRef}
              className="order-1 max-w-4xl flex-grow lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BlogFooterCard
                author={author}
                date={createdAt}
                readingTime={readingTime}
                tags={tags}
                title={title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />

              <div className="mb-5 overflow-x-hidden rounded-xl border items-center border-[#cafff7]/30 bg-white shadow-sm md:p-8">
                <div
                  className="prose prose-headings:!text-gray-800 
                    prose-headings:!font-bold prose-p:!text-gray-700 prose-a:text-[#00753c] 
                    prose-a:font-medium prose-a:no-underline hover:prose-a:underline 
                    prose-blockquote:rounded-r-md prose-blockquote:border-l-4 
                    prose-blockquote:border-[#04877F] prose-blockquote:bg-[#cafff7]/10 
                    prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-700 
                    prose-strong:text-gray-800 prose-em:text-gray-800 prose-code:rounded 
                    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono 
                    prose-code:text-[#04877F] prose-code:before:content-none prose-code:after:content-none 
                    prose-pre:bg-gray-900 prose-pre:rounded-xl 
                    prose-ol:mb-6 prose-ul:mb-6 prose-li:text-gray-700 
                    prose-table:w-full prose-table:border-collapse 
                    prose-th:p-3 prose-th:bg-gray-100 prose-th:text-left prose-td:border 
                    prose-td:border-gray-200 prose-td:p-3 prose-td:text-left prose-img:rounded-xl 
                    prose-img:shadow-md max-w-none list-none"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
                    rehypePlugins={[rehypeSlug, rehypeAutoLinkHeadings, rehypeHighlight, rehypeRaw]}
                  >
                    {content}
                  </ReactMarkdown>
                </div>

                {/* Article Footer */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                      <p className="mb-2 flex items-center text-lg font-bold text-[#04877F]">
                        <Award className="mr-2 h-5 w-5" />
                        Thanks for reading!
                      </p>
                      <p className="text-gray-600">
                        If you found this article helpful, please share it with others.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <LikeButton slug={slug} />
                      <ViewCounter slug={slug} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </>
  );
}
