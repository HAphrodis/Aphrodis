/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import redisClient from "./redis";

// Base class for Redis schemas
export class RedisSchema {
  protected prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  protected generateKey(id: string): string {
    return `${this.prefix}:${id}`;
  }

  protected generateId(): string {
    return uuidv4();
  }

  async getAll(): Promise<any[]> {
    const keys = await redisClient.keys(`${this.prefix}:*`);
    if (keys.length === 0) return [];

    const pipeline = redisClient.pipeline();
    keys.forEach((key) => pipeline.hgetall(key));
    const results = await pipeline.exec();

    return results?.map((result) => result[1]) || [];
  }

  async findById(id: string): Promise<any | null> {
    const key = this.generateKey(id);
    const data = await redisClient.hgetall(key);
    return Object.keys(data).length > 0 ? { id, ...data } : null;
  }

  async findOne(filter: Record<string, any>): Promise<any | null> {
    const keys = await redisClient.keys(`${this.prefix}:*`);
    if (keys.length === 0) return null;

    const pipeline = redisClient.pipeline();
    keys.forEach((key) => pipeline.hgetall(key));
    const results = await pipeline.exec();

    if (!results) return null;

    const items: Array<Record<string, any>> = results.map((result, index) => {
      const id = keys[index].split(":")[1];
      return { id, ...(result[1] as Record<string, any>) };
    });

    const item = items.find((item) => {
      return Object.entries(filter).every(([key, value]) => {
        return item[key] === value;
      });
    });

    return item || null;
  }

  async create(data: Record<string, any>): Promise<any> {
    const id = data.id || this.generateId();
    const key = this.generateKey(id);

    // Convert all values to strings for Redis
    const stringifiedData = Object.entries(data).reduce(
      (acc, [k, v]) => {
        acc[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
        return acc;
      },
      {} as Record<string, string>,
    );

    await redisClient.hset(key, stringifiedData);
    return { id, ...data };
  }

  async updateById(id: string, data: Record<string, any>): Promise<any> {
    const key = this.generateKey(id);
    const exists = await redisClient.exists(key);
    if (!exists) return null;

    // Convert all values to strings for Redis
    const stringifiedData = Object.entries(data).reduce(
      (acc, [k, v]) => {
        acc[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
        return acc;
      },
      {} as Record<string, string>,
    );

    await redisClient.hset(key, stringifiedData);
    return { id, ...data };
  }

  async deleteById(id: string): Promise<boolean> {
    const key = this.generateKey(id);
    const result = await redisClient.del(key);
    return result > 0;
  }

  async deleteOne(filter: Record<string, any>): Promise<boolean> {
    const item = await this.findOne(filter);
    if (!item) return false;
    return this.deleteById(item.id);
  }
}

// Index management for Redis
export class RedisIndex {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private generateKey(field: string, value: string): string {
    return `${this.prefix}:index:${field}:${value}`;
  }

  async set(field: string, value: string, id: string): Promise<void> {
    const key = this.generateKey(field, value);
    await redisClient.set(key, id);
  }

  async get(field: string, value: string): Promise<string | null> {
    const key = this.generateKey(field, value);
    return redisClient.get(key);
  }

  async remove(field: string, value: string): Promise<void> {
    const key = this.generateKey(field, value);
    await redisClient.del(key);
  }
}
