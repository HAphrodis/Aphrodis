/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/create-user-repl.js
// Run this in the Node.js REPL with:
// node -e "require('./scripts/create-user-repl.js')"

const Redis = require("ioredis")
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcryptjs")
require('dotenv').config({ path: ['.env.local', ] })

// Ensure REDIS_URL is set in your environment variables
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in the environment variables")
}

// Connect to Redis
const redisClient = new Redis(process.env.REDIS_URL)

async function createAdminUser() {
  try {
    console.log("Connected to Redis")

    // User details
    const userId = uuidv4()
    const email = "h@gmail.com"
    const password = "Password@123!"

    // Check if email already exists
    const emailIndexKey = `staff:index:email:${email}`
    const existingId = await redisClient.get(emailIndexKey)

    if (existingId) {
      console.log(`User with email ${email} already exists with ID: ${existingId}`)
      await redisClient.quit()
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
 
    // Create timestamp
    const now = new Date().toISOString()

    // Create user in Redis
    const userKey = `staff:${userId}`
    await redisClient.hset(
      userKey,
      "id",
      userId,
      "firstName",
      "Admin",
      "lastName",
      "User",
      "email",
      email,
      "password",
      hashedPassword,
      "role",
      "Admin",
      "gender",
      "Male",
      "status",
      "active",
      "isTwoFactorEnabled",
      "false",
      "emailNotifications",
      "true",
      "pushNotifications",
      "false",
      "createdAt",
      now,
      "updatedAt",
      now,
      "passwordLastChanged",
      now,
    )

    // Create email index
    await redisClient.set(emailIndexKey, userId)

    console.log("Admin user created successfully!")
    console.log("User ID:", userId)
    console.log("Email:", email)
    console.log("You can now log in with these credentials.")

    await redisClient.quit()
  } catch (error) {
    console.error("Error creating admin user:", error)
    try {
      await redisClient.quit()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Ignore
    }
  }
}

createAdminUser()
