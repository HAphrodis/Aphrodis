import mongoose, { type Document, Schema } from "mongoose";

export interface IUnsubscribeFeedback extends Document {
  email: string;
  reason: string;
  feedback: string;
  stayedSubscribed: boolean;
  timestamp: Date;
  createdAt: string;
  updatedAt: string;
}

const UnsubscribeFeedbackSchema = new Schema<IUnsubscribeFeedback>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    reason: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      default: "",
    },
    stayedSubscribed: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Check if the model already exists to prevent overwriting
const UnsubscribeFeedback =
  mongoose.models.UnsubscribeFeedback ||
  mongoose.model<IUnsubscribeFeedback>(
    "UnsubscribeFeedback",
    UnsubscribeFeedbackSchema,
  );

export default UnsubscribeFeedback;
