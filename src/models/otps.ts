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
        for: {
            type: String
        },
        todayAt: {
            type: Date
        },
        sentCount: {
            type: Number
        },
        confirmed: {
            type: boolean
        },
        avaliableUntil: {
            type: Date
        }

    }
)
const OTP = model("OTP",otpSchema)
export default OTP