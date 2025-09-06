import { RedisSchema, RedisIndex } from "@/lib/redis-schema";
import { v4 as uuidv4 } from "uuid";

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: "error" | "warning" | "success" | "info";
  timestamp: string;
  read: boolean;
  archived: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

class NotificationSchema extends RedisSchema {
  private typeIndex: RedisIndex;
  private readIndex: RedisIndex;
  private archivedIndex: RedisIndex;

  constructor() {
    super("notification");
    this.typeIndex = new RedisIndex("notification");
    this.readIndex = new RedisIndex("notification");
    this.archivedIndex = new RedisIndex("notification");
  }

  async create(data: Partial<INotification>): Promise<INotification> {
    // Set default values
    const now = new Date().toISOString();
    const notificationData = {
      id: data.id || uuidv4(),
      timestamp: data.timestamp || now,
      read: data.read || false,
      archived: data.archived || false,
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    // Create the notification
    const result = await super.create(notificationData);

    // Create indexes
    if (data.type) {
      await this.typeIndex.set("type", data.type, result.id);
    }
    await this.readIndex.set("read", String(notificationData.read), result.id);
    await this.archivedIndex.set(
      "archived",
      String(notificationData.archived),
      result.id,
    );

    return result as INotification;
  }

  async findByType(type: string): Promise<INotification[]> {
    const allNotifications = await this.getAll();
    return allNotifications.filter(
      (notification) => notification.type === type,
    ) as INotification[];
  }

  async findByRead(read: boolean): Promise<INotification[]> {
    const readStr = read ? true : false;
    const allNotifications = await this.getAll();
    return allNotifications.filter(
      (notification) => notification.read === readStr,
    ) as INotification[];
  }

  async findByArchived(archived: boolean): Promise<INotification[]> {
    const archivedStr = archived ? true : false;
    const allNotifications = await this.getAll();
    return allNotifications.filter(
      (notification) => notification.archived === archivedStr,
    ) as INotification[];
  }

  async markAsRead(id: string): Promise<INotification | null> {
    const notification = (await this.findById(id)) as INotification | null;
    if (!notification) return null;

    // Update read status
    const oldReadStatus = notification.read;
    notification.read = true;
    notification.updatedAt = new Date().toISOString();

    // Update the notification
    const result = (await super.updateById(id, notification)) as INotification;

    // Update indexes
    await this.readIndex.remove("read", String(oldReadStatus));
    await this.readIndex.set("read", "true", id);

    return result;
  }

  async archive(id: string): Promise<INotification | null> {
    const notification = (await this.findById(id)) as INotification | null;
    if (!notification) return null;

    // Update archived status
    const oldArchivedStatus = notification.archived;
    notification.archived = true;
    notification.updatedAt = new Date().toISOString();

    // Update the notification
    const result = (await super.updateById(id, notification)) as INotification;

    // Update indexes
    await this.archivedIndex.remove("archived", String(oldArchivedStatus));
    await this.archivedIndex.set("archived", "true", id);

    return result;
  }

  async getAllSorted(
    options: { limit?: number; offset?: number } = {},
  ): Promise<{
    notifications: INotification[];
    total: number;
  }> {
    const allNotifications = (await this.getAll()) as INotification[];

    // Sort by timestamp (newest first)
    allNotifications.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    const total = allNotifications.length;

    // Apply pagination if options are provided
    if (options.limit !== undefined && options.offset !== undefined) {
      const paginatedNotifications = allNotifications.slice(
        options.offset,
        options.offset + options.limit,
      );
      return { notifications: paginatedNotifications, total };
    }

    return { notifications: allNotifications, total };
  }
}

const Notification = new NotificationSchema();
export default Notification;
