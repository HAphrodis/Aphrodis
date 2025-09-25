import { RedisSchema, RedisIndex } from "@/lib/redis-schema";
import redisClient from "@/lib/redis"; // Import redisClient

export interface ISession {
  id: string;
  userId: string;
  token: string;
  expires: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
}

class SessionSchema extends RedisSchema {
  private userIdIndex: RedisIndex;
  private tokenIndex: RedisIndex;

  constructor() {
    super("session");
    this.userIdIndex = new RedisIndex("session");
    this.tokenIndex = new RedisIndex("session");
  }

  async create(data: Partial<ISession>): Promise<ISession> {
    // Set default values
    const now = new Date().toISOString();
    const sessionData = {
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    // Create the session
    const result = await super.create(sessionData);

    // Create indexes
    if (data.userId) {
      await this.userIdIndex.set("userId", data.userId, result.id);
    }
    if (data.token) {
      await this.tokenIndex.set("token", data.token, result.id);
    }

    return result as ISession;
  }

  async findByUserId(userId: string): Promise<ISession[]> {
    const allSessions = await this.getAll();
    return allSessions.filter(
      (session) => session.userId === userId,
    ) as ISession[];
  }

  async findByToken(token: string): Promise<ISession | null> {
    const id = await this.tokenIndex.get("token", token);
    if (!id) return null;
    return this.findById(id) as Promise<ISession | null>;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const sessions = await this.findByUserId(userId);
    if (sessions.length === 0) return false;

    const pipeline = redisClient.pipeline();
    for (const session of sessions) {
      // Remove indexes
      await this.userIdIndex.remove("userId", userId);
      await this.tokenIndex.remove("token", session.token);

      // Delete the session
      pipeline.del(this.generateKey(session.id));
    }

    await pipeline.exec();
    return true;
  }

  async deleteByToken(token: string): Promise<boolean> {
    const session = await this.findByToken(token);
    if (!session) return false;

    // Remove indexes
    await this.userIdIndex.remove("userId", session.userId);
    await this.tokenIndex.remove("token", token);

    // Delete the session
    return this.deleteById(session.id);
  }

  async cleanExpiredSessions(): Promise<number> {
    const allSessions = await this.getAll();
    const now = new Date();
    const expiredSessions = allSessions.filter((session) => {
      return new Date(session.expires) < now;
    });

    const pipeline = redisClient.pipeline();
    for (const session of expiredSessions) {
      // Remove indexes
      await this.userIdIndex.remove("userId", session.userId);
      await this.tokenIndex.remove("token", session.token);

      // Delete the session
      pipeline.del(this.generateKey(session.id));
    }

    await pipeline.exec();
    return expiredSessions.length;
  }
}

const Session = new SessionSchema();
export default Session;
export type { ISession as SessionType };
