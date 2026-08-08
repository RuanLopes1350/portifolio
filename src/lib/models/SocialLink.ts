import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocialLink extends Document {
  platform: string;
  label: string;
  url: string;
  iconName: string;
  order: number;
}

const SocialLinkSchema: Schema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    label: { type: String, required: true },
    url: { type: String, required: true },
    iconName: { type: String, default: 'Link' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SocialLink: Model<ISocialLink> =
  mongoose.models.SocialLink || mongoose.model<ISocialLink>('SocialLink', SocialLinkSchema);

export default SocialLink;
