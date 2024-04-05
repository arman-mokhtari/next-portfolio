import { Schema, models, model, Document } from "mongoose";

export interface ISkill extends Document {
  type: string;
  title: string;
  number: number;
}

const SkillSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  number: { type: Number, required: true },
});

const Skill = models.Skill || model("Skill", SkillSchema);

export default Skill;