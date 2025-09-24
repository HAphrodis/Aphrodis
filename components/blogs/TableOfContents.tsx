'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SubscribeNewsletter from './SubscribeNewsletter';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [visitedHeadings, setVisitedHeadings] = useState<Set<string>>(
    new Set()
  );

  const readingProgress = useReadingProgress();
  const isComplete = readingProgress >= 98;

  const handleScroll = useCallback(() => {
    const headingElements = headings.map((heading) =>
      document.getElementById(heading.id)
    );

    const visibleHeadings = headingElements.filter((el): el is HTMLElement => {
      if (el === null) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
    });

    if (visibleHeadings.length > 0) {
      const currentHeadingId = visibleHeadings[0].id;
      setActiveId(currentHeadingId);

      // Mark this heading as visited
      setVisitedHeadings((prev) => {
        const newSet = new Set(prev);
        newSet.add(currentHeadingId);
        return newSet;
      });
    }
  }, [headings]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToHeading = (headingId: string) => {
    const targetElement = document.getElementById(headingId);
    if (targetElement) {
      const navbarHeight = 64; // Adjust this value based on your navbar height
      const yOffset = -navbarHeight - 16; // Additional 16px for some breathing room
      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (!isLargeScreen) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className="w-full bg-white text-black lg:w-80"
      aria-label="Table of contents"
    >
      <div className="rounded-xl border border-[#cafff7]/50 bg-white p-6 shadow-md">
        <div className="mb-2 flex items-center justify-between lg:mb-4">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-[#11922f]" />
            <p className="font-bold text-[#11922f]">In this Article</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen ? 'Close table of contents' : 'Open table of contents'
            }
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Reading progress indicator */}
        <div className="mb-4 hidden lg:block">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#11922f] transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span className="font-medium">{Math.round(readingProgress)}%</span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {(isOpen || isLargeScreen) && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[50vh] overflow-y-auto pr-2">
                <ul className="space-y-1">
                  {headings.map((heading) => (
                    <motion.li
                      key={heading.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        className={`group flex w-full items-center justify-between rounded-md py-2 text-left text-sm transition-colors duration-200 ease-in-out ${
                          activeId === heading.id
                            ? 'bg-[#cafff7]/20 font-medium text-[#11922f]'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        style={{ paddingLeft: `${heading.level * 8}px` }}
                        onClick={() => scrollToHeading(heading.id)}
                      >
                        <span className="line-clamp-1">{heading.text}</span>
                        {visitedHeadings.has(heading.id) && (
                          <CheckCircle className="ml-2 h-3 w-3 text-[#11922f]" />
                        )}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {isComplete && (
                <motion.div
                  className="mt-4 rounded-lg bg-[#cafff7]/20 p-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="mx-auto mb-2 h-6 w-6 text-[#11922f]" />
                  <p className="text-sm font-medium text-[#11922f]">
                    You&apos;ve completed this article!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SubscribeNewsletter />
    </nav>
  );
}
