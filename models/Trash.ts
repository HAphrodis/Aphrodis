import mongoose, { Schema, Document, Model } from "mongoose";

interface ITrash extends Document {
  id: number;
  name: string;
  type: "member" | "message" | "subscriber" | "gallery";
  data: string;
  createdAt: string;
  updatedAt: string;
}

const trashSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: String, required: true },
  },
  { timestamps: true },
);

const Trash: Model<ITrash> =
  mongoose.models.Trash || mongoose.model<ITrash>("Trash", trashSchema);
export default Trash;
