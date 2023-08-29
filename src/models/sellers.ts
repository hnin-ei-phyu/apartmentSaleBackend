import { Schema, model } from "mongoose"
import application from "../constants/application"

const sellerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true

        },
        phoneNum: {
            type: String,
            required: true
        },
        nrcNumber: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            min: 0,
            max: 2,
            default: "1"
        },
        bio: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
            default : 3
        },
        profile: {
            type: Number,
            required: false
        },
        registered: {
            type: Boolean,
            required: false
        }
    },
    {
        virtuals: {
            roleLabel: {
                get() {
                    return application.userRoles[this.role]
                }
            }
        },
        timestamps: true
    }
)
const Seller = model("Seller", sellerSchema)
export default Seller