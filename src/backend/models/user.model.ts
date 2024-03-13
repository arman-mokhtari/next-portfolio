import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    avatar: { type: String },
    biography: { type: String, default: null },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, required: false, select: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    role: { type: String, default: "USER" },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
