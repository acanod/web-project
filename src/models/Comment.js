import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    title: String,
    text: String,
    rating: Number,
    user: [
        {
            ref: "User",
            type: Schema.Types.ObjectId,
        }
    ],
    product: [
        {
            ref: "Product",
            type: Schema.Types.ObjectId,
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
});

export default model('Comment', commentSchema);