import { Schema, model, models, Document } from "mongoose";
interface IUser extends Document {
  name?: string;
  email: string;
  gender?: string;
  provider: string;
  password?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  image?: string;
  phone?: string;
  city?: string;
  sector?: string;
  house?: string;
  streetAddress?: string;
  district?: string;
  status?: string;
  info?: string[];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    provider: { type: String, default: "credentials" },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    image: { type: String },
    phone: { type: String },
    city: { type: String },
    sector: { type: String },
    house: { type: String },
    streetAddress: { type: String },
    district: { type: String },
    status: { type: String, default: "active" },
    info: { type: String },
  },
  { timestamps: true },
);

export const User = models?.User || model<IUser>("User", UserSchema);
