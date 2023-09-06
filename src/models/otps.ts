import { boolean } from "joi"
import { Schema, model } from "mongoose"
const otpSchema: Schema = new Schema(
    {
        otp: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: {expires: 300}
            //After 5 minutes it deleted automatically from the database
        }
    },
    {
        timestamps: true
    }
)
const OTP = model("OTP",otpSchema)
export default OTP