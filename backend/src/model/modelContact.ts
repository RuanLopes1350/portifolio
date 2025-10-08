import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { typeContact } from '../types/typeContact.js';

class ModelContact {
    schema: mongoose.Schema<typeContact>;

    constructor() {
        this.schema = new mongoose.Schema(
            {
                name: { type: String, required: true },
                link: { type: String, required: true }
            },
            { 
                versionKey: false, 
                timestamps: true 
            }
        );

        this.schema.plugin(mongoosePaginate);
        this.model = mongoose.model('contact', this.schema);
    }
}

export default new ModelContact().model;