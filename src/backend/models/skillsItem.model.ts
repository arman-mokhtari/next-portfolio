import { Schema, models, model, Document } from "mongoose";

export interface ISkills extends Document {
  proTitle: string;
  proNumber: number;
  publicTitle: string;
  publicNumber: number;
}

const SkillsSchema = new Schema({
  proTitle: { type: String, required: true },
  proNumber: { type: Number, required: true },
  publicTitle: { type: String, required: true },
  publicNumber: { type: Number, required: true },
});

const Skills = models.Skills || model("Skills", SkillsSchema);

export default Skills;
