import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAbout extends Document {
  name: string;
  headline: string;
  bio: string;
  avatarUrl?: string;
  statusText?: string;
  location: string;
  employmentStatus: 'available' | 'employed';
  companyName?: string;
}

const AboutSchema: Schema = new Schema<IAbout>(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: { type: String },
    statusText: { type: String },
    location: { type: String, required: true, default: 'Vilhena, RO - Brasil' },
    employmentStatus: { type: String, enum: ['available', 'employed'], default: 'available' },
    companyName: { type: String, default: '' },
  },
  { timestamps: true }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

export default About;
