// utils\readingTime.ts
export const calculateReadingTime = (
  content: string,
  wordsPerMinute: number = 200,
): string => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};
