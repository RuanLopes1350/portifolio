import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

class ModelSkills {
    model: mongoose.Model<any>;

    constructor(){
        const schema = new mongoose.Schema(
            {
                skill: { type: String, required: true },
            },
            {
                timestamps: true,
                versionKey: false,
            }
        )

        schema.plugin(mongoosePaginate);
        this.model = mongoose.model("skills", schema);
    }
}

export default new ModelSkills().model;