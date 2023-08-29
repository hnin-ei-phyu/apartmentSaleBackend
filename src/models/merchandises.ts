import { bool, boolean } from "joi"
import mongoose, { Schema, model } from "mongoose"

const merchandiseSchema: Schema = new Schema(
    {
        item: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        photo: {
            type: String,
            required: false
        },
        detail: {
            type: String,
            required: true
        },
        videos: {
            type: String,
            required: false
        },
        isPubliced: {
            type: boolean
        },
        isSoldout: {
            type: boolean
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            Ref: "Seller"
        }
    },
    {
        timestamps: true
    }
)
const Merchandise = model ("Merchandise",merchandiseSchema)
export default Merchandise