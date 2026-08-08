import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectSection {
  title: string;
  description: string;
  githubUrl?: string;
  technologies?: string[];
}

export interface IProject extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  npmUrl?: string;
  images: string[];
  codeSnippet?: string;
  architectureNotes?: string;
  sections?: IProjectSection[];
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSectionSchema = new Schema<IProjectSection>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String },
  technologies: { type: [String], default: [] },
});

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String },
    liveUrl: { type: String },
    npmUrl: { type: String },
    images: { type: [String], default: [] },
    codeSnippet: { type: String },
    architectureNotes: { type: String },
    sections: { type: [ProjectSectionSchema], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
