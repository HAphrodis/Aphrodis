/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedisSchema, RedisIndex } from "@/lib/redis-schema";
import { v4 as uuidv4 } from "uuid";

export interface IFeatureRequest {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "rejected";
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
}

class FeatureRequestSchema extends RedisSchema {
  private statusIndex: RedisIndex;
  private priorityIndex: RedisIndex;
  private requestedByIndex: RedisIndex;

  constructor() {
    super("feature_request");
    this.statusIndex = new RedisIndex("feature_request");
    this.priorityIndex = new RedisIndex("feature_request");
    this.requestedByIndex = new RedisIndex("feature_request");
  }

  async create(data: Partial<IFeatureRequest>): Promise<IFeatureRequest> {
    // Set default values
    const now = new Date().toISOString();
    const featureRequestData = {
      id: data.id || uuidv4(),
      priority: data.priority || "medium",
      status: data.status || "pending",
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    // Create the feature request
    const result = await super.create(featureRequestData);

    // Create indexes
    if (data.status) {
      await this.statusIndex.set("status", data.status, result.id);
    } else {
      await this.statusIndex.set("status", "pending", result.id);
    }

    if (data.priority) {
      await this.priorityIndex.set("priority", data.priority, result.id);
    } else {
      await this.priorityIndex.set("priority", "medium", result.id);
    }

    if (data.requestedBy) {
      await this.requestedByIndex.set(
        "requestedBy",
        data.requestedBy,
        result.id,
      );
    }

    return result as IFeatureRequest;
  }

  async findByStatus(status: string): Promise<IFeatureRequest[]> {
    const allRequests = await this.getAll();
    return allRequests.filter(
      (request) => request.status === status,
    ) as IFeatureRequest[];
  }

  async findByPriority(priority: string): Promise<IFeatureRequest[]> {
    const allRequests = await this.getAll();
    return allRequests.filter(
      (request) => request.priority === priority,
    ) as IFeatureRequest[];
  }

  async findByRequestedBy(email: string): Promise<IFeatureRequest[]> {
    const allRequests = await this.getAll();
    return allRequests.filter(
      (request) => request.requestedBy === email,
    ) as IFeatureRequest[];
  }

  async updateStatus(
    id: string,
    status: string,
  ): Promise<IFeatureRequest | null> {
    const request = (await this.findById(id)) as IFeatureRequest | null;
    if (!request) return null;

    // Update status
    const oldStatus = request.status;
    request.status = status as any;
    request.updatedAt = new Date().toISOString();

    // Update the feature request
    const result = (await super.updateById(id, request)) as IFeatureRequest;

    // Update indexes
    await this.statusIndex.remove("status", oldStatus);
    await this.statusIndex.set("status", status, id);

    return result;
  }

  async getAllSorted(
    options: {
      limit?: number;
      offset?: number;
      sortBy?: "createdAt" | "updatedAt" | "priority";
      sortOrder?: "asc" | "desc";
    } = {},
  ): Promise<{
    featureRequests: IFeatureRequest[];
    total: number;
  }> {
    const allRequests = (await this.getAll()) as IFeatureRequest[];

    // Sort by specified field or default to createdAt
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";

    allRequests.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority =
          priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bPriority =
          priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        return sortOrder === "asc"
          ? aPriority - bPriority
          : bPriority - aPriority;
      } else {
        const aDate = new Date(a[sortBy]).getTime();
        const bDate = new Date(b[sortBy]).getTime();
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }
    });

    const total = allRequests.length;

    // Apply pagination if options are provided
    if (options.limit !== undefined && options.offset !== undefined) {
      const paginatedRequests = allRequests.slice(
        options.offset,
        options.offset + options.limit,
      );
      return { featureRequests: paginatedRequests, total };
    }

    return { featureRequests: allRequests, total };
  }
}

const FeatureRequest = new FeatureRequestSchema();
export default FeatureRequest;
