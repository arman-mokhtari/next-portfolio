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
    nationality: { type: String, trim: true, default: "ایران" },
    age: { type: String, trim: true },
    expertise: { type: String, trim: true },
    languages: [{ type: String }],
    avatar: { type: String },
    profileImage: { type: String },
    password: { type: String },
    location: { type: String, default: "ایران، تهران" },
    instagram: { type: String },
    twitter: { type: String },
    telegram: { type: String },
    facebook: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
