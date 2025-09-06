import Session from "@/models/Session";
import { TwoFactorToken } from "@/models/Staff";
import logger from "@/utils/logger";

export async function cleanupExpiredSessions() {
  try {
    const count = await Session.cleanExpiredSessions();
    logger.info(`Cleaned up ${count} expired sessions`);
    return count;
  } catch (error) {
    logger.error(`Error cleaning up expired sessions: ${error}`);
    throw error;
  }
}

export async function cleanupExpiredTwoFactorTokens() {
  try {
    const allTokens = await TwoFactorToken.getAll();
    const now = new Date();
    let count = 0;

    for (const token of allTokens) {
      if (new Date(token.expires) < now) {
        await TwoFactorToken.deleteById(token.id);
        count++;
      }
    }

    logger.info(`Cleaned up ${count} expired two-factor tokens`);
    return count;
  } catch (error) {
    logger.error(`Error cleaning up expired two-factor tokens: ${error}`);
    throw error;
  }
}
