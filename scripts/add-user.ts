// scripts/add-user.js
import redisClient from "../utils/redis.js"
import StaffMember from "../models/Staff.js"
import { hashPassword } from "../utils/passwordUtils.js"

async function addUser() {
  try {
    console.log("Creating admin user in Redis...")

    // Replace with your email and desired password
    const email = "ijbapte@gmail.com"
    const password = "Password@123!"

    // Check if user already exists
    const existingUser = await StaffMember.findByEmail(email)
    if (existingUser) {
      console.log("User already exists:", existingUser.id)
      await redisClient.quit()
      return
    }

    // Create user
    const user = await StaffMember.create({
      firstName: "Admin",
      lastName: "User",
      email: email,
      password: await hashPassword(password),
      role: "Admin",
      gender: "Prefer not to say",
      status: "active",
      isTwoFactorEnabled: "false",
      emailNotifications: "true",
      pushNotifications: "false",
    })

    console.log("User created successfully:", user.id)
    console.log("You can now login with:", email)

    await redisClient.quit()
  } catch (error) {
    console.error("Error creating user:", error)
    await redisClient.quit()
    process.exit(1)
  }
}

addUser()
