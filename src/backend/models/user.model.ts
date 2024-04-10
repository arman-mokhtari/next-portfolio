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
  home?: typeof CommonSchema;
  about?: typeof CommonSchema & { isTopBubble?: boolean; topBubble?: string };
  skills?: typeof CommonSchema;
  skillsItem: {
    title: { type: string };
    number: { type: number };
    type: { type: string };
  };
  resumeItems: {
    desc: { type: string };
    date: { type: string };
    type: { type: string };
  };
  socials?: {
    instagram: {
      href: string;
      isDisplay: boolean;
    };
    twitter: {
      href: string;
      isDisplay: boolean;
    };
    telegram: {
      href: string;
      isDisplay: boolean;
    };
    facebook: {
      href: string;
      isDisplay: boolean;
    };
    whatsapp: {
      href: string;
      isDisplay: boolean;
    };
    github: {
      href: string;
      isDisplay: boolean;
    };
  };
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
    socials: {
      instagram: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
      twitter: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
      telegram: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
      facebook: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
      whatsapp: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
      github: {
        href: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
      },
    },
    location: { type: String, required: true, default: "ایران، تهران" },

    home: CommonSchema,
    about: {
      ...CommonSchema,
      isTopBubble: { type: Boolean },
      topBubble: { type: String },
    },
    skills: CommonSchema,
    skillsItem: {
      title: { type: String, required: true },
      number: { type: Number, required: true },
      type: { type: String },
    },
    resume: CommonSchema,
    resumeItems: {
      desc: { type: String, required: true },
      date: { type: Date, required: true },
      type: { type: String },
    },
    activities: {
      ...CommonSchema,
      activityLinks: [{ type: String }],
    },
    contact: CommonSchema,
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
