export function generateId(): string {
  // Generate a random string of 8 characters
  const randomPart = Math.random().toString(36).substring(2, 10);

  // Get current timestamp
  const timestamp = Date.now();

  // Combine timestamp and random string
  return `${timestamp}-${randomPart}`;
}
