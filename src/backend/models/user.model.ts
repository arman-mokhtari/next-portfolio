import { Schema, models, model, Document } from "mongoose";

// Define interfaces for specialized skills and general skills
interface ISkill {
  name: string;
  rate: number;
}

// Schema for specialized skills
const SpecializedSkillSchema = new Schema({
  name: { type: String },
  rate: { type: Number },
});

// Schema for general skills
const GeneralSkillSchema = new Schema({
  name: { type: String },
  rate: { type: Number },
});

// Schema for working experience
const WorkingExperienceSchema = new Schema({
  description: { type: String },
  date: { type: Date },
});

// Schema for educational qualifications
const EducationalQualificationSchema = new Schema({
  description: { type: String },
  date: { type: Date },
});

export interface IUser extends Document {
  clerkId: string;
  name: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  nationality?: string;
  age?: string;
  expertise?: string;
  languages?: string[];
  avatar?: string;
  profileImage?: string;
  projectsImage?: string[];
  password?: string;
  location?: string;
  contactTitle: string;
  contactDescription: string;
  activitiesTitle: string;
  activitiesDescription: string;
  instagram?: string;
  twitter?: string;
  telegram?: string;
  facebook?: string;
  specializedSkills?: ISkill[];
  generalSkills?: ISkill[];
  workingExperience?: Array<Document>;
  educationalQualifications?: Array<Document>;
}

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, trim: true },
    nationality: { type: String, trim: true },
    age: { type: String, trim: true },
    expertise: { type: String, trim: true },
    languages: [{ type: String }],
    avatar: { type: String },
    profileImage: { type: String },
    resumeLink: { type: String },
    typedStrings: [{ type: String }],
    projectsImage: [{ type: String }],
    password: { type: String },
    location: { type: String },
    contactTitle: { type: String },
    contactDescription: { type: String },
    activitiesTitle: { type: String },
    activitiesDescription: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    telegram: { type: String },
    facebook: { type: String },
    specializedSkills: [SpecializedSkillSchema],
    generalSkills: [GeneralSkillSchema],
    workingExperience: [WorkingExperienceSchema],
    educationalQualifications: [EducationalQualificationSchema],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;

