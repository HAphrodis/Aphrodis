// Utility to ensure URLs are properly formatted
export function formatUrl(baseUrl: string, path: string): string {
  // Ensure baseUrl has proper protocol
  const formattedBase = baseUrl.startsWith("http")
    ? baseUrl
    : `https://${baseUrl}`;

  // Remove trailing slash from base URL if present
  const cleanBase = formattedBase.endsWith("/")
    ? formattedBase.slice(0, -1)
    : formattedBase;

  // Ensure path starts with a slash
  const formattedPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${formattedPath}`;
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error(`Invalid URL: ${url}`);
    return false;
  }
}
