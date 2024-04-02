import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  role: string;
  bio?: string;
  cv?: string;
  email: string;
  phone?: string;
  nationality?: string;
  age?: string;
  expertise?: string;
  languages?: string;
  picture: string;
  avatar?: string;
  profileImage?: string;
  status?: string;
  password?: string;
  location?: string;
  instagram?: string;
  twitter?: string;
  telegram?: string;
  facebook?: string;
  home?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
  about?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
  skills?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
  resume?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
  activities?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
  contact?: {
    title: string;
    desc: string;
    metaTitle: string;
    metaDesk: string;
  };
}

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: "USER" },
    bio: { type: String },
    cv: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, trim: true },
    nationality: { type: String, trim: true, required: true, default: "ایران" },
    age: { type: String, trim: true },
    expertise: { type: String, trim: true },
    languages: { type: String, trim: true },
    picture: { type: String, required: true },
    avatar: { type: String },
    profileImage: { type: String },
    status: { type: String },
    password: { type: String },
    typed: [{ type: String }],
    location: { type: String, required: true, default: "ایران، تهران" },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    telegram: { type: String },
    facebook: { type: String },
    home: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
    },
    about: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
      isTopBubble: { type: Boolean },
      topBubble: { type: String },
    },
    skills: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
    },
    resume: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
    },
    activities: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
    },
    contact: {
      title: { type: String },
      desc: { type: String },
      metaTitle: { type: String },
      metaDesk: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
