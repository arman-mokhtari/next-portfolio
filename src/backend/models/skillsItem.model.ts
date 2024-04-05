import { Schema, models, model, Document } from "mongoose";

export interface ISkill extends Document {
  proTitle: string;
  proNumber: number;
  publicTitle: string;
  publicNumber: number;
}

const SkillSchema = new Schema({
  proTitle: { type: String },
  proNumber: { type: Number },
  publicTitle: { type: String },
  publicNumber: { type: Number },
});

const Skill = models.Skills || model("Skill", SkillSchema);

export default Skill;
