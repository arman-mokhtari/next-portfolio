import { Schema, models, model, Document } from "mongoose";

interface ISkill {
  name: string;
  rate: number;
}

interface IWorkingExperience extends Document {
  description: string;
  date: Date;
}

interface IEducationalQualification extends Document {
  description: string;
  date: Date;
}

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
  avatar?: string;
  profileImage?: string;
  resumeLink?: string;
  typedStrings?: string[];
  projectsImage?: string[];
  password?: string;
  location?: string;
  contactTitle?: string;
  contactDescription?: string;
  activitiesTitle?: string;
  activitiesDescription?: string;
  instagram?: string;
  twitter?: string;
  telegram?: string;
  facebook?: string;
  specializedSkills?: ISkill[];
  generalSkills?: ISkill[];
  workingExperience?: IWorkingExperience[];
  educationalQualifications?: IEducationalQualification[];
}

const SpecializedSkillSchema = new Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
});

const GeneralSkillSchema = new Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
});

const WorkingExperienceSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const EducationalQualificationSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, trim: true },
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

UserSchema.index({ email: 1 }, { unique: true });

const User = models.User || model<IUser>("User", UserSchema);

export default User;
