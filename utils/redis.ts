import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined in the environment variables');
}

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('error', (err) => {
  console.error('🔴 Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('🚀 Redis Client Connected');
});

redisClient.on('ready', () => {
  console.log('✅ Redis Client Ready');
});

// Add a function to test Redis operations
export async function testRedisOperations() {
  try {
    await redisClient.set('test_key', 'test_value');
    const value = await redisClient.get('test_key');
    console.log('Redis test operation result:', value);
    await redisClient.del('test_key');
  } catch (error) {
    console.error('Redis test operation failed:', error);
  }
}

export default redisClient;
