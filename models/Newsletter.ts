import { RedisSchema, RedisIndex } from "@/lib/redis-schema";
import { v4 as uuidv4 } from "uuid";

export interface INewsletter {
  id: string;
  title: string;
  subject: string;
  content: string;
  previewText: string;
  status: "draft" | "scheduled" | "sent";
  scheduledFor: string | null; // ISO string
  sentAt: string | null; // ISO string
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  sentToCount: string; // Redis stores as strings
  openCount: string;
  clickCount: string;
  tags: string; // Comma-separated tags
}

class NewsletterSchema extends RedisSchema {
  private statusIndex: RedisIndex;
  private createdByIndex: RedisIndex;
  private tagIndex: RedisIndex;

  constructor() {
    super("newsletter");
    this.statusIndex = new RedisIndex("newsletter");
    this.createdByIndex = new RedisIndex("newsletter");
    this.tagIndex = new RedisIndex("newsletter");
  }

  async create(data: Partial<INewsletter>): Promise<INewsletter> {
    // Set default values
    const now = new Date().toISOString();
    const newsletterId = data.id || uuidv4();

    const newsletterData = {
      id: newsletterId,
      title: data.title || "",
      subject: data.subject || "",
      content: data.content || "",
      previewText: data.previewText || "",
      status: data.status || "draft",
      scheduledFor: data.scheduledFor || null,
      sentAt: data.sentAt || null,
      createdAt: now,
      updatedAt: now,
      createdBy: data.createdBy || "",
      sentToCount: data.sentToCount || "0",
      openCount: data.openCount || "0",
      clickCount: data.clickCount || "0",
      tags: data.tags || "",
    };

    // Create the newsletter
    const result = await super.create(newsletterData);

    // Create indexes
    await this.statusIndex.set("status", newsletterData.status, result.id);

    if (data.createdBy) {
      await this.createdByIndex.set("createdBy", data.createdBy, result.id);
    }

    // Create tag indexes if tags exist
    if (newsletterData.tags) {
      const tagArray = newsletterData.tags.split(",").map((tag) => tag.trim());
      for (const tag of tagArray) {
        if (tag) {
          await this.tagIndex.set("tag", tag, result.id);
        }
      }
    }

    return result as INewsletter;
  }

  async findByStatus(status: string): Promise<INewsletter[]> {
    const allNewsletters = await this.getAll();
    return allNewsletters.filter(
      (newsletter) => newsletter.status === status,
    ) as INewsletter[];
  }

  async findByCreatedBy(userId: string): Promise<INewsletter[]> {
    const allNewsletters = await this.getAll();
    return allNewsletters.filter(
      (newsletter) => newsletter.createdBy === userId,
    ) as INewsletter[];
  }

  async findByTag(tag: string): Promise<INewsletter[]> {
    const allNewsletters = await this.getAll();
    return allNewsletters.filter((newsletter) => {
      const tags = newsletter.tags.split(",").map((t: string) => t.trim());
      return tags.includes(tag);
    }) as INewsletter[];
  }

  async updateById(
    id: string,
    data: Partial<INewsletter>,
  ): Promise<INewsletter | null> {
    // Get existing newsletter
    const existingNewsletter = (await this.findById(id)) as INewsletter | null;
    if (!existingNewsletter) return null;

    // Prepare update data
    const updateData = { ...data, updatedAt: new Date().toISOString() };

    // Handle status change
    if (data.status && data.status !== existingNewsletter.status) {
      await this.statusIndex.remove("status", existingNewsletter.status);
      await this.statusIndex.set("status", data.status, id);

      // If status changed to sent, update sentAt
      if (data.status === "sent" && existingNewsletter.status !== "sent") {
        updateData.sentAt = new Date().toISOString();
      }
    }

    // Handle tags change
    if (data.tags && data.tags !== existingNewsletter.tags) {
      // Remove old tag indexes
      const oldTags = existingNewsletter.tags
        .split(",")
        .map((tag) => tag.trim());
      for (const tag of oldTags) {
        if (tag) {
          await this.tagIndex.remove("tag", tag);
        }
      }

      // Add new tag indexes
      const newTags = data.tags.split(",").map((tag) => tag.trim());
      for (const tag of newTags) {
        if (tag) {
          await this.tagIndex.set("tag", tag, id);
        }
      }
    }

    // Update the newsletter
    return super.updateById(id, updateData) as Promise<INewsletter | null>;
  }

  async incrementCounter(
    id: string,
    counter: "sentToCount" | "openCount" | "clickCount",
    amount = 1,
  ): Promise<INewsletter | null> {
    const newsletter = (await this.findById(id)) as INewsletter | null;
    if (!newsletter) return null;

    const currentCount = Number.parseInt(newsletter[counter] || "0", 10);
    const newCount = currentCount + amount;

    return this.updateById(id, {
      [counter]: newCount.toString(),
    }) as Promise<INewsletter | null>;
  }

  async getScheduledNewsletters(): Promise<INewsletter[]> {
    const now = new Date().toISOString();
    const scheduledNewsletters = await this.findByStatus("scheduled");

    return scheduledNewsletters.filter(
      (newsletter) => newsletter.scheduledFor && newsletter.scheduledFor <= now,
    );
  }

  async getAllSorted(
    options: {
      limit?: number;
      offset?: number;
      sortBy?: "createdAt" | "updatedAt" | "scheduledFor" | "sentAt";
      sortOrder?: "asc" | "desc";
      status?: "draft" | "scheduled" | "sent" | "all";
      tag?: string;
    } = {},
  ): Promise<{
    newsletters: INewsletter[];
    total: number;
  }> {
    let allNewsletters = (await this.getAll()) as INewsletter[];

    // Filter by status if provided
    if (options.status && options.status !== "all") {
      allNewsletters = allNewsletters.filter(
        (newsletter) => newsletter.status === options.status,
      );
    }

    // Filter by tag if provided
    if (options.tag) {
      allNewsletters = allNewsletters.filter((newsletter) => {
        const tags = newsletter.tags.split(",").map((t) => t.trim());
        return tags.includes(options.tag!);
      });
    }

    // Sort by specified field or default to createdAt
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";

    allNewsletters.sort((a, b) => {
      // Handle null values
      if (!a[sortBy] && !b[sortBy]) return 0;
      if (!a[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (!b[sortBy]) return sortOrder === "asc" ? 1 : -1;

      const aValue = a[sortBy] as string;
      const bValue = b[sortBy] as string;

      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    const total = allNewsletters.length;

    // Apply pagination if options are provided
    if (options.limit !== undefined && options.offset !== undefined) {
      const paginatedNewsletters = allNewsletters.slice(
        options.offset,
        options.offset + options.limit,
      );
      return { newsletters: paginatedNewsletters, total };
    }

    return { newsletters: allNewsletters, total };
  }
}

const Newsletter = new NewsletterSchema();
export default Newsletter;
