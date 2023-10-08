import { Schema, model } from "mongoose"
import application from "../constants/application"

const buyerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: false
        },
        email: {
            type: String,
            required: false,
        },
        password: {
            type: String,
<<<<<<< HEAD
            required: true
=======
            required: true,
>>>>>>> 3b0b59fe25896c8a879e536259a672e980580682

        },
        nrcNumber: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
<<<<<<< HEAD
            required: false
=======
            required: false,
>>>>>>> 3b0b59fe25896c8a879e536259a672e980580682
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
            default: 1
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
