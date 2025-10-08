import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { typeProjects } from '../types/typeProjects.js';

class ModelProjects {
    model: mongoose.Model<typeProjects>;

    constructor() {
        const schema = new mongoose.Schema<typeProjects>(
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                technologies: { type: [String], required: true },
                linkGitHub: { type: String, required: true },
                linkDemo: { type: String, required: false },
            }, {
            timestamps: true,
            versionKey: false,
        }
        );

        schema.plugin(mongoosePaginate);
        this.model = mongoose.model("projects", schema);
    }
}

export default new ModelProjects().model;