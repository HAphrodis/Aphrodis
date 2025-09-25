/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";

export interface UnsubscribeFeedback {
  id: string;
  email: string;
  reason: string;
  feedback: string;
  stayedSubscribed: boolean;
  timestamp: string;
}

const FEEDBACK_KEY_PREFIX = "feedback:";
const FEEDBACK_SET = "feedback";

export async function createUnsubscribeFeedback(data: {
  email: string;
  reason: string;
  feedback: string;
  stayedSubscribed: boolean;
}): Promise<UnsubscribeFeedback> {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const feedbackRecord: UnsubscribeFeedback = {
    id,
    email: data.email,
    reason: data.reason,
    feedback: data.feedback,
    stayedSubscribed: data.stayedSubscribed,
    timestamp,
  };

  const pipeline = redis.pipeline();

  // Store the feedback as a hash
  pipeline.hset(`${FEEDBACK_KEY_PREFIX}${id}`, feedbackRecord as any);

  // Add to the sorted set of all feedback
  pipeline.zadd(FEEDBACK_SET, new Date(timestamp).getTime(), id);

  await pipeline.exec();

  return feedbackRecord;
}
