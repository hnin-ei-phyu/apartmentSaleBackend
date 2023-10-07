import { Schema, model } from "mongoose"
import application from "../constants/application"

const sellerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: false,
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
        comfirmedPassword: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false
        },
        nrcNumber: {
            type: String,
            required: false

        },
        address: {
            type: String,
            required: false
        },
        role: {
            type: Number,
            min: 0,
            max: 2,
            default: "2"
        },
        bio: {
            type: String,
            requried: false
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
