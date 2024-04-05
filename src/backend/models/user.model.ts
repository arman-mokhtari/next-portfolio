import { Schema, models, model, Document } from "mongoose";

const CommonSchema = {
  title: { type: String },
  desc: { type: String },
  metaTitle: { type: String },
  metaDesk: { type: String },
};

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
  home?: typeof CommonSchema;
  about?: typeof CommonSchema & { isTopBubble?: boolean; topBubble?: string };
  skills?: typeof CommonSchema & Schema.Types.ObjectId[];
  resume?: typeof CommonSchema;
  activities?: typeof CommonSchema;
  contact?: typeof CommonSchema;
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
    home: CommonSchema,
    about: {
      ...CommonSchema,
      isTopBubble: { type: Boolean },
      topBubble: { type: String },
    },
    skills: {
      ...CommonSchema,
      skillsItem: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    },
    resume: CommonSchema,
    activities: CommonSchema,
    contact: CommonSchema,
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
