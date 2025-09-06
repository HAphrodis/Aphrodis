/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "redis"
import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"

// Connect to Redis
const redisClient = createClient({
  url: process.env.REDIS_URL,
})

async function seedSampleData() {
  try {
    await redisClient.connect()
    console.log("Connected to Redis")

    // Seed messages
    await seedMessages(20)

    // Seed subscribers
    await seedSubscribers(10)

    console.log("Sample data seeded successfully!")
    await redisClient.quit()
  } catch (error) {
    console.error("Error seeding sample data:", error)
    try {
      await redisClient.quit()
    } catch (e) {
      // Ignore
    }
    process.exit(1)
  }
}

function generateIpHash() {
  // Generate a random IP address
  const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255,
  )}.${Math.floor(Math.random() * 255)}`

  // Hash the IP
  return crypto.createHash("sha256").update(ip).digest("hex")
}

async function seedMessages(count) {
  console.log(`Seeding ${count} messages...`)

  const statuses = ["unread", "read", "replied", "archived"]

  for (let i = 0; i < count; i++) {
    const messageId = uuidv4()
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // Create a random date within the last 5 months
    const date = new Date()
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 5))
    date.setDate(Math.floor(Math.random() * 28) + 1) // Random day between 1-28

    await redisClient.hSet(`message:${messageId}`, {
      id: messageId,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      message: `This is a sample message ${i + 1} for testing purposes.`,
      timestamp: date.toISOString(),
      status: status,
      ipHash: generateIpHash(),
    })

    // Create email index
    await redisClient.set(`message:index:email:user${i + 1}@example.com`, messageId)

    // Create status index
    await redisClient.set(`message:index:status:${status}`, messageId)
  }

  console.log(`${count} messages seeded successfully!`)
}

async function seedSubscribers(count) {
  console.log(`Seeding ${count} subscribers...`)

  for (let i = 0; i < count; i++) {
    const subscriberId = uuidv4()
    const status = Math.random() > 0.2 ? "active" : "inactive" // 80% active, 20% inactive

    // Create a random date within the last 5 months
    const date = new Date()
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 5))
    date.setDate(Math.floor(Math.random() * 28) + 1) // Random day between 1-28

    await redisClient.hSet(`subscriber:${subscriberId}`, {
      id: subscriberId,
      email: `subscriber${i + 1}@example.com`,
      name: `Subscriber ${i + 1}`,
      status: status,
      timestamp: date.toISOString(),
      ipHash: generateIpHash(),
    })

    // Create email index
    await redisClient.set(`subscriber:index:email:subscriber${i + 1}@example.com`, subscriberId)

    // Create status index
    await redisClient.set(`subscriber:index:status:${status}`, subscriberId)
  }

  console.log(`${count} subscribers seeded successfully!`)
}

seedSampleData()
