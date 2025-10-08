import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';
import { typeAbout } from '../types/typeAbout.js';

class About {
    model: mongoose.Model<any>;

    constructor() {
        const schema = new mongoose.Schema(
            {
                about: { type: String, required: true },
            }, 
            {
                timestamps: true,
                versionKey: false,
            }
        );

        schema.plugin(mongoosePaginate);
        this.model = mongoose.model("about", schema);
    }
}

export default new About().model;