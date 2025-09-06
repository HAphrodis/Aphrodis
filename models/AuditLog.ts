// models\AuditLog.ts
import { RedisSchema, RedisIndex } from "@/lib/redis-schema";

export interface IAuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

class AuditLogSchema extends RedisSchema {
  countDocuments() {
    throw new Error("Method not implemented.");
  }
  private userIndex: RedisIndex;
  private actionIndex: RedisIndex;

  constructor() {
    super("audit_log");
    this.userIndex = new RedisIndex("audit_log");
    this.actionIndex = new RedisIndex("audit_log");
  }

  async create(data: Partial<IAuditLog>): Promise<IAuditLog> {
    // Set default values
    const now = new Date().toISOString();
    const logData = {
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    // Create the audit log
    const result = await super.create(logData);

    // Create indexes
    if (data.user) {
      await this.userIndex.set("user", data.user, result.id);
    }
    if (data.action) {
      await this.actionIndex.set("action", data.action, result.id);
    }

    return result as IAuditLog;
  }

  async findByUser(user: string): Promise<IAuditLog[]> {
    const allLogs = await this.getAll();
    return allLogs.filter((log) => log.user === user) as IAuditLog[];
  }

  async findByAction(action: string): Promise<IAuditLog[]> {
    const allLogs = await this.getAll();
    return allLogs.filter((log) => log.action === action) as IAuditLog[];
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IAuditLog[]> {
    const allLogs = await this.getAll();
    return allLogs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    }) as IAuditLog[];
  }
}

const AuditLog = new AuditLogSchema();
export default AuditLog;
