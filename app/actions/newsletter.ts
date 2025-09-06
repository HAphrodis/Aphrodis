/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import loops from "@/lib/loops";
import {
  subscribeSchema,
  type SubscribeInput,
} from "@/lib/validations/newsletter";

export async function subscribeToNewsletter(data: SubscribeInput) {
  try {
    // Validate the input
    const result = subscribeSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    const { email } = result.data;

    // Subscribe the user to Loops
    await loops.createContact(email);

    return {
      success: true,
      message: "Successfully subscribed to the newsletter!",
    };
  } catch (error: any) {
    // Handle Loops specific errors
    if (error.status === 409) {
      return {
        success: false,
        error: "This email is already subscribed to our newsletter.",
      };
    }

    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
