import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  bio?: string;
  email: string;
  phone?: string;
  nationality?: string;
  age?: string;
  expertise?: string;
  languages?: string[];
  picture: string;
  profileImage?: string;
  password?: string;
  location?: string;
  instagram?: string;
  twitter?: string;
  telegram?: string;
  facebook?: string;
}

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, trim: true },
    nationality: { type: String, trim: true, required: true, default: "ایران" },
    age: { type: String, trim: true },
    expertise: { type: String, trim: true },
    languages: [{ type: String }],
    picture: { type: String, required: true },
    profileImage: { type: String },
    password: { type: String },
    location: { type: String, required: true, default: "ایران، تهران" },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    telegram: { type: String },
    facebook: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
