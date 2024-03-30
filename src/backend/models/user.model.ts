import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  nationality?: string;
  age?: string;
  expertise?: string;
  languages?: string[];
  avatar?: string;
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
    username: { type: String, required: true, unique: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, trim: true },
    nationality: { type: String, trim: true, required: true, default: "ایران" },
    age: { type: String, trim: true },
    expertise: { type: String, trim: true },
    languages: [{ type: String }],
    avatar: { type: String },
    profileImage: { type: String },
    password: { type: String },
    location: { type: String, required: true, default: "ایران، تهران" },
    instagram: {
      type: String,
      required: true,
      default: "https://www.instagram.com/",
    },
    twitter: { type: String, required: true, default: "https://twitter.com/" },
    telegram: { type: String, required: true, default: "https://t.me/" },
    facebook: {
      type: String,
      required: true,
      default: "https://facebook.com/",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
