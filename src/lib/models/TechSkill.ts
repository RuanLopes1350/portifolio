import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITechSkill extends Document {
  category: string;
  skills: string[];
  order: number;
}

const TechSkillSchema: Schema = new Schema<ITechSkill>(
  {
    category: { type: String, required: true },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TechSkill: Model<ITechSkill> =
  mongoose.models.TechSkill || mongoose.model<ITechSkill>('TechSkill', TechSkillSchema);

export default TechSkill;
