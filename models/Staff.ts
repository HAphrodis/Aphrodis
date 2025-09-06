/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedisSchema, RedisIndex } from "@/lib/redis-schema";
import bcrypt from "bcryptjs";

export interface IStaffMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  telephone?: string;
  email: string;
  gender: string;
  address?: string;
  status: string;
  position?: string;
  department?: string;
  avatarUrl?: string;
  password: string;
  passwordLastChanged: string;
  isTwoFactorEnabled: string;
  twoFactorSecret?: string;
  emailNotifications: string;
  pushNotifications: string;
  createdAt: string;
  updatedAt: string;
}

class StaffMemberSchema extends RedisSchema {
  findByIdAndUpdate(userId: unknown, arg1: { password: string }) {
    throw new Error("Method not implemented.");
  }
  private emailIndex: RedisIndex;

  constructor() {
    super("staff");
    this.emailIndex = new RedisIndex("staff");
  }

  async create(data: Partial<IStaffMember>): Promise<IStaffMember> {
    // Check if email already exists
    if (data.email) {
      const existingId = await this.emailIndex.get("email", data.email);
      if (existingId) {
        throw new Error("Email already exists");
      }
    }

    // Hash password if provided
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Set default values
    const now = new Date().toISOString();
    const staffData = {
      role: "Viewer",
      status: "active",
      avatarUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg",
      passwordLastChanged: now,
      isTwoFactorEnabled: "false",
      emailNotifications: "true",
      pushNotifications: "false",
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    // Create the staff member
    const result = await super.create(staffData);

    // Create email index
    if (data.email) {
      await this.emailIndex.set("email", data.email, result.id);
    }

    return result as IStaffMember;
  }

  async findByEmail(email: string): Promise<IStaffMember | null> {
    const id = await this.emailIndex.get("email", email);
    if (!id) return null;
    return this.findById(id) as Promise<IStaffMember | null>;
  }

  async updateById(
    id: string,
    data: Partial<IStaffMember>,
  ): Promise<IStaffMember | null> {
    // Get existing staff
    const existingStaff = (await this.findById(id)) as IStaffMember | null;
    if (!existingStaff) return null;

    // Handle password update
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
      data.passwordLastChanged = new Date().toISOString();
    }

    // Handle email update
    if (data.email && data.email !== existingStaff.email) {
      // Remove old email index
      await this.emailIndex.remove("email", existingStaff.email);
      // Create new email index
      await this.emailIndex.set("email", data.email, id);
    }

    // Update timestamp
    data.updatedAt = new Date().toISOString();

    // Update the staff member
    return super.updateById(id, data) as Promise<IStaffMember | null>;
  }

  async deleteById(id: string): Promise<boolean> {
    const staff = (await this.findById(id)) as IStaffMember | null;
    if (!staff) return false;

    // Remove email index
    await this.emailIndex.remove("email", staff.email);

    // Delete the staff member
    return super.deleteById(id);
  }

  async comparePassword(
    staffId: string,
    candidatePassword: string,
  ): Promise<boolean> {
    const staff = (await this.findById(staffId)) as IStaffMember | null;
    if (!staff) return false;
    return bcrypt.compare(candidatePassword, staff.password);
  }
}

const StaffMember = new StaffMemberSchema();
export default StaffMember;

// Two Factor Token Schema
class TwoFactorTokenSchema extends RedisSchema {
  private emailIndex: RedisIndex;

  constructor() {
    super("two_factor_token");
    this.emailIndex = new RedisIndex("two_factor_token");
  }

  async create(data: {
    email: string;
    token: string;
    expires: Date;
  }): Promise<any> {
    // Convert expires to ISO string
    const tokenData = {
      ...data,
      expires: data.expires.toISOString(),
    };

    // Create the token
    const result = await super.create(tokenData);

    // Create email index
    await this.emailIndex.set("email", data.email, result.id);

    return result;
  }

  async findByEmail(email: string): Promise<any | null> {
    const id = await this.emailIndex.get("email", email);
    if (!id) return null;
    return this.findById(id);
  }

  async findByEmailAndToken(email: string, token: string): Promise<any | null> {
    const allTokens = await this.getAll();
    return (
      allTokens.find((t) => t.email === email && t.token === token) || null
    );
  }

  async deleteByEmail(email: string): Promise<boolean> {
    const token = await this.findByEmail(email);
    if (!token) return false;

    // Remove email index
    await this.emailIndex.remove("email", email);

    // Delete the token
    return this.deleteById(token.id);
  }
}

export const TwoFactorToken = new TwoFactorTokenSchema();

// Two Factor Confirmation Schema
class TwoFactorConfirmationSchema extends RedisSchema {
  private staffIdIndex: RedisIndex;

  constructor() {
    super("two_factor_confirmation");
    this.staffIdIndex = new RedisIndex("two_factor_confirmation");
  }

  async create(data: { staffId: string }): Promise<any> {
    // Create the confirmation
    const result = await super.create(data);

    // Create staffId index
    await this.staffIdIndex.set("staffId", data.staffId, result.id);

    return result;
  }

  async findByStaffId(staffId: string): Promise<any | null> {
    const id = await this.staffIdIndex.get("staffId", staffId);
    if (!id) return null;
    return this.findById(id);
  }

  async deleteByStaffId(staffId: string): Promise<boolean> {
    const confirmation = await this.findByStaffId(staffId);
    if (!confirmation) return false;

    // Remove staffId index
    await this.staffIdIndex.remove("staffId", staffId);

    // Delete the confirmation
    return this.deleteById(confirmation.id);
  }
}

export const TwoFactorConfirmation = new TwoFactorConfirmationSchema();
