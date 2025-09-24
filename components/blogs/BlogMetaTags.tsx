import Head from 'next/head';

interface BlogMetaTagsProps {
  title: string;
  // description: string
  // author: string
  publishedDate: string;
  modifiedDate?: string;
  featuredImage: string;
  // tags: string[]
  // url: string
}

export default function BlogMetaTags({
  title,
  // description,
  // author,
  publishedDate,
  modifiedDate,
  featuredImage
  // tags,
  // url,
}: BlogMetaTagsProps) {
  // Truncate description to 160 characters for SEO best practices
  // const truncatedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      {/* <meta name="description" content={truncatedDescription} /> */}
      {/* <meta name="author" content={author} /> */}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      {/* <meta property="og:description" content={truncatedDescription} /> */}
      <meta property="og:image" content={featuredImage} />
      {/* <meta property="og:url" content={url} /> */}
      <meta property="og:site_name" content="Your Blog Name" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {/* <meta name="twitter:description" content={truncatedDescription} /> */}
      <meta name="twitter:image" content={featuredImage} />

      {/* Article Specific */}
      <meta property="article:published_time" content={publishedDate} />
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {/* {tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))} */}

      {/* Canonical URL */}
      {/* <link rel="canonical" href={url} /> */}
    </Head>
  );
}
