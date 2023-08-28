import { bool, boolean } from "joi"
import { Schema, model } from "mongoose"

const merchandiseSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        township: {
            type: String,
            required: true
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
        thumbnail: {
            type: String,
            required: true
        },
        offical_remark: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)
const Merchandise = model ("Merchandise",merchandiseSchema)
export default Merchandise