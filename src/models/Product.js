import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String,
    comment: [
        {
            ref: "Comment",
            type: Schema.Types.ObjectId,
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);