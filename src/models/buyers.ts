import { Schema, model } from "mongoose"
import application from "../constants/application"
import { text } from "stream/consumers"
import { boolean } from "joi"

const buyerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true
        },
        email: {
            type: String,
            required: false,
            unique: true
        },
        password: {
            type: String,
            required: false

        },
        nrcNumber: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            requried: false
        },
        rating: {
            type: Number,
            default: 3,
        },
        registered: {
            type: Boolean
        },
        savedItems: {
            type: Array, "default": []
        },
        expoTokens: {
            type: Array, "default": []
        },
        role: {
            type: Number,
            min: 0,
            max: 2,
            default: 2
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
const Buyer = model("Buyer", buyerSchema)
export default Buyer