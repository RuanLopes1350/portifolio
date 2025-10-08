import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

class ModelContact {
    model: mongoose.Model<any>;

    constructor() {
        const schema = new mongoose.Schema(
            {
                name: { type: String, required: true },
                link: { type: String, required: true }
            },
            { 
                versionKey: false, 
                timestamps: true 
            }
        );

        schema.plugin(mongoosePaginate);
        this.model = mongoose.model("contact", schema)
    }
}

export default new ModelContact().model;