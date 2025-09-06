'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  alignment?: 'left' | 'center' | 'right';
  overlay?: 'light' | 'dark' | 'gradient' | 'brand';
  height?: 'small' | 'medium' | 'large';
  animation?: boolean;
  pattern?: 'dots' | 'lines' | 'waves' | 'medical' | 'none';
  className?: string;
}

export default function EnhancedPageHeader({
  title,
  description,
  backgroundImage = '/assets/hero.jpg',
  breadcrumbs,
  alignment = 'center',
  overlay = 'brand',
  height = 'small',
  animation = true,
  pattern = 'medical',
  className = ''
}: PageHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Generate breadcrumbs if not provided
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: title }
  ];

  const breadcrumbItems = breadcrumbs || defaultBreadcrumbs;

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setParallaxOffset(scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    setIsLoaded(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Height classes based on prop
  const heightClasses = {
    small: 'h-[200px] md:h-[250px]',
    medium: 'h-[400px] md:h-[500px]',
    large: 'h-[500px] md:h-[600px]'
  };

  // Alignment classes based on prop
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  // Overlay classes based on prop
  const overlayClasses = {
    light: 'bg-white/40 backdrop-blur-sm',
    dark: 'bg-black/70',
    gradient: 'bg-gradient-to-br from-black/60 via-black/40 to-black/60',
    brand:
      'bg-gradient-to-br from-[#39B288]/80 via-[#5AB2E4]/60 to-[#39B288]/80'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const PatternOverlay = () => {
    switch (pattern) {
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]" />
          </div>
        );
      case 'lines':
        return (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,.3)_50%,rgba(255,255,255,.3)_100%)] bg-[length:4px_4px]" />
          </div>
        );
      case 'waves':
        return (
          <div className="absolute inset-0 opacity-20">
            <svg
              className="absolute bottom-0 left-0 w-full"
              preserveAspectRatio="none"
              style={{ height: '20vh' }}
              viewBox="0 0 1440 320"
            >
              <path
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </div>
        );
      case 'medical':
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  height="60"
                  id="medical-cross"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  x="0"
                  y="0"
                >
                  <rect fill="white" height="40" width="10" x="25" y="10" />
                  <rect fill="white" height="10" width="40" x="10" y="25" />
                </pattern>
                <pattern
                  height="40"
                  id="health-dots"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  x="0"
                  y="0"
                >
                  <circle cx="20" cy="20" fill="white" r="2" />
                </pattern>
              </defs>
              <rect fill="url(#health-dots)" height="100%" width="100%" />
              <rect fill="url(#medical-cross)" height="100%" width="100%" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        heightClasses[height],
        className
      )}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 h-full w-full scale-110 transform"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image
          alt={`${title} banner`}
          className="object-cover"
          fill
          onLoad={() => setIsLoaded(true)}
          priority
          sizes="100vw"
          src={backgroundImage || '/placeholder.svg'}
        />
      </div>

      {/* Overlay */}
      <div className={cn('absolute inset-0', overlayClasses[overlay])}>
        <PatternOverlay />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          className="absolute top-1/4 right-10 h-8 w-8 rounded-full bg-white/20"
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse'
          }}
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          className="absolute bottom-1/3 left-10 h-12 w-12 rounded-full bg-white/15"
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          className="absolute top-1/2 left-1/4 h-6 w-6 rounded-full bg-[#F3703D]/30"
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse'
          }}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16',
          alignmentClasses[alignment]
        )}
      >
        {animation && isLoaded ? (
          <motion.div
            animate="visible"
            className={cn(
              'flex max-w-5xl flex-col',
              alignmentClasses[alignment]
            )}
            initial="hidden"
            variants={containerVariants}
          >
            {/* Breadcrumbs */}
            <motion.nav
              aria-label="Breadcrumb"
              className="mb-4 hidden text-sm text-white/90 sm:block md:text-sm"
            >
              <ol
                className={cn(
                  'flex items-center space-x-1',
                  alignment === 'center' ? 'justify-center' : '',
                  alignment === 'right' ? 'justify-end' : ''
                )}
              >
                {breadcrumbItems.map((item, index) => (
                  <li className="flex items-center" key={index}>
                    {index > 0 && (
                      <ChevronRight className="mx-2 h-4 w-4 text-white/70" />
                    )}
                    {index === 0 && <Home className="mr-2 h-4 w-4" />}
                    {item.href ? (
                      <Link
                        className="transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-white">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>

            {/* Title with enhanced styling */}
            <motion.div className="relative mb-6">
              <h1 className="text-3xl leading-tight font-bold tracking-tight text-white md:text-3xl lg:text-3xl xl:text-4xl">
                <span className="inline-block">{title}</span>
              </h1>

              {/* Decorative underline */}
              <motion.div
                animate={{ width: '120px' }}
                className={cn(
                  'mt-2 h-1 rounded-full bg-white',
                  alignment === 'center' ? 'mx-auto' : '',
                  alignment === 'right' ? 'ml-auto' : ''
                )}
                initial={{ width: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              />

              {/* Accent line */}
              <motion.div
                animate={{ width: '60px' }}
                className={cn(
                  'mt-1 h-0.5 rounded-full bg-[#F3703D]',
                  alignment === 'center' ? 'mx-auto' : '',
                  alignment === 'right' ? 'ml-auto' : ''
                )}
                initial={{ width: 0 }}
                transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Description */}
            {description && (
              <motion.div className="relative">
                <p className="max-w-4xl leading-relaxed text-white/95 md:text-lg">
                  {description}
                </p>

                {/* Decorative quote mark */}
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -left-4 text-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <svg
                    fill="currentColor"
                    height="32"
                    viewBox="0 0 24 24"
                    width="32"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Non-animated fallback
          <div
            className={cn(
              'flex max-w-5xl flex-col',
              alignmentClasses[alignment]
            )}
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-white/90 md:text-base"
            >
              <ol
                className={cn(
                  'flex items-center space-x-1',
                  alignment === 'center' ? 'justify-center' : '',
                  alignment === 'right' ? 'justify-end' : ''
                )}
              >
                {breadcrumbItems.map((item, index) => (
                  <li className="flex items-center" key={index}>
                    {index > 0 && (
                      <ChevronRight className="mx-2 h-4 w-4 text-white/70" />
                    )}
                    {index === 0 && <Home className="mr-2 h-4 w-4" />}
                    {item.href ? (
                      <Link
                        className="transition-colors duration-200 hover:text-white hover:underline"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-white">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="relative mb-6">
              <h1 className="text-3xl leading-tight font-bold tracking-tight text-white md:text-3xl lg:text-3xl xl:text-4xl">
                {title}
              </h1>
              <div
                className={cn(
                  'mt-4 h-1 w-32 rounded-full bg-white',
                  alignment === 'center' ? 'mx-auto' : '',
                  alignment === 'right' ? 'ml-auto' : ''
                )}
              />
            </div>

            {description && (
              <p className="max-w-4xl text-lg leading-relaxed font-light text-white/95 md:text-lg lg:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom wave decoration
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-16">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          />
        </svg>
      </div> */}
    </div>
  );
}
