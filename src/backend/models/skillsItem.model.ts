import { Schema, models, model, Document } from "mongoose";

export interface ISkill extends Document {
  type: string;
  title: string;
  number: number;
}

const SkillSchema = new Schema({
  type: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "" },
  number: { type: Number, required: true, default: 0 },
});

const Skill = models.Skill || model("Skill", SkillSchema);

export default Skill;
